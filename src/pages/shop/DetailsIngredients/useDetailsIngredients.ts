import { useApi } from "@hooks";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { IDetailsIngredient, IProducts } from "../../../interfaces/general";
import { useCallback, useEffect, useState } from "react";
import { decrypt } from "@utils";

interface IResponseCocktailsAPI {
  drinks: IProducts[];
}

interface IResponseIngredientAPI {
  ingredients: {
    strDescription: string;
    strType: string;
  }[];
}

export default () => {
  const { loadApi, loadingApi } = useApi();
  const [detailsIngredient, setDetailsIngredient] =
    useState<IDetailsIngredient>();
  const { id: current } = useParams();

  const getIngredientsDetails = useCallback(async () => {
    try {
      const name_current_ingredient = decrypt(`${current}`).split("*")[0];
      const img_current_ingredient = decrypt(`${current}`).split("*")[1];

      const ingredients = await loadApi<IResponseIngredientAPI>({
        type: "GET",
        headers: {
          "access-token": undefined,
          "Content-Type": "application/json",
        },
        instance: "api_cocktail",
        endpoint: `search.php?i=${name_current_ingredient}`,
      });

      const cocktails = await loadApi<IResponseCocktailsAPI>({
        type: "GET",
        headers: {
          "access-token": undefined,
          "Content-Type": "application/json",
        },
        instance: "api_cocktail",
        endpoint: `filter.php?i=${name_current_ingredient}`,
      });

      cocktails.drinks.map((cocktail: IProducts) => {
        cocktail.id = cocktail.idDrink || "";
        cocktail.name = cocktail.strDrink || "";
        cocktail.imageSrc = cocktail.strDrinkThumb || "";
        cocktail.imageAlt = cocktail.strDrink || "";
        return cocktail;
      });

      const ingredient = ingredients.ingredients[0];

      setDetailsIngredient({
        name: name_current_ingredient,
        description: ingredient.strDescription,
        imageSrc: img_current_ingredient,
        type: ingredient.strType,
        cocktails: cocktails.drinks,
      });
    } catch (error) {
      console.log(error);
      return enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
      });
    }
  }, [current, loadApi]);

  useEffect(() => {
    getIngredientsDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    detailsIngredient,
    loading: loadingApi.includes(
      `GET__filter.php?i=${decrypt(`${current}`).split("*")[0]}`
    ),
  };
};

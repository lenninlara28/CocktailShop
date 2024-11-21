import { useApi } from "@hooks";
import { enqueueSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { IDetailsCocktail } from "../../../interfaces/general";
import { useCallback, useEffect, useState } from "react";
import { decrypt } from "@utils";

interface IResponseCocktailAPI {
  drinks: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strCategory: string;
    strInstructionsES: string;
    [key: `strIngredient${number}`]: string;
  }[];
}

export default () => {
  const { loadApi, loadingApi } = useApi();
  const [detailsCocktail, setDetailsCocktail] = useState<IDetailsCocktail>();
  const { id: id_current_cocltail } = useParams();

  const getCocktailDetails = useCallback(async () => {
    try {
      const data = await loadApi<IResponseCocktailAPI>({
        type: "GET",
        headers: {
          "access-token": undefined,
          "Content-Type": "application/json",
        },
        instance: "api_cocktail",
        endpoint: `lookup.php?i=${decrypt(`${id_current_cocltail}`)}`,
      });
      const drinks = data.drinks[0];

      /* Calculate ingredients */
      const ingredients: string[] = [];
      let existingIngredients = true;
      let cantIngredients = 1;
      while (existingIngredients) {
        if (drinks[`strIngredient${cantIngredients}`]) {
          ingredients.push(drinks[`strIngredient${cantIngredients}`]);
          cantIngredients++;
        } else {
          existingIngredients = false;
        }
      }

      setDetailsCocktail({
        name: drinks.strDrink,
        imageAlt: drinks.strDrink,
        imageSrc: drinks.strDrinkThumb,
        description: drinks.strInstructionsES,
        ingredients: ingredients,
        type: drinks.strCategory,
      });
    } catch {
      return enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
      });
    }
  }, [loadApi, id_current_cocltail]);

  useEffect(() => {
    getCocktailDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    detailsCocktail,
    loading: loadingApi.includes(
      `GET__lookup.php?i=${decrypt(`${id_current_cocltail}`)}`
    ),
  };
};

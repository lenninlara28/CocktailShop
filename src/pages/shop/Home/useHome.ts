import { useApi } from "@hooks";
import { useUserStore } from "@stores";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { IProducts } from "../../../interfaces/general";
import { useCallback, useEffect, useState } from "react";
import { encrypt } from "@utils";

interface IResponseCocktailAPI {
  drinks: {
    idDrink: string;
    strDrink: string;
    strDrinkThumb: string;
    strMeasure4: string;
    strInstructionsES: string;
    strIngredient1: string;
  }[];
}

export default () => {
  const user = useUserStore((state) => state.user);
  const { loadApi, loadingApi } = useApi();
  const navigate = useNavigate();
  const [popularCocktail, setPopularCocktail] = useState<IProducts[]>();
  const [popularIngredients, setPopularIngredients] = useState<IProducts[]>();
  const currentPopularCocktail = useUserStore(
    (state) => state.popularCocktails
  );

  const getCocktailPopular = useCallback(async () => {
    try {
      /* In this case, the endpoint for getting a popular cocktail is premium, so I'll request four random cocktails and save in localstorage. */
      const cocktail_populars: IProducts[] = [];
      [...Array(4)].map(async () => {
        const data = await loadApi<IResponseCocktailAPI>({
          type: "POST",
          headers: {
            "access-token": undefined,
            "Content-Type": "application/json",
          },
          instance: "api_cocktail",
          endpoint: "random.php",
        });
        const drinks = data.drinks[0];
        cocktail_populars.push({
          id: drinks.idDrink,
          name: drinks.strDrink,
          imageSrc: drinks.strDrinkThumb,
          imageAlt: drinks.strDrink,
          price: "",
          descriptions: drinks.strInstructionsES,
        });
      });
      setPopularCocktail(cocktail_populars);
    } catch {
      return enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
      });
    }
  }, [loadApi]);

  const goDetails = (rute: string) => {
    if (user) {
      navigate(`/home/details/cocktail/${encrypt(rute)}`);
    } else {
      return enqueueSnackbar(
        "Para obtener detalles del coctel debe iniciar sesión ",
        {
          variant: "warning",
          autoHideDuration: 3000,
        }
      );
    }
  };

  const getIngredientsPopular = useCallback(async () => {
    try {
      /* In this case, the endpoint for getting a popular ingredients is premium, so I'll request four frist ingredients and save in localstorage. */
      const ingredients_populars: IProducts[] = [];

      const data = await loadApi<IResponseCocktailAPI>({
        type: "GET",
        headers: {
          "access-token": undefined,
          "Content-Type": "application/json",
        },
        instance: "api_cocktail",
        endpoint: "list.php?i=list",
      });

      data.drinks
        .filter((_, index) => index < 4)
        .map((drinks) => {
          ingredients_populars.push({
            id: "",
            name: drinks.strIngredient1,
            imageSrc: `https://www.thecocktaildb.com/images/ingredients/${drinks.strIngredient1}.png`,
            imageAlt: drinks.strIngredient1,
            price: "",
            descriptions: "",
          });
        });

      setPopularIngredients(ingredients_populars);
    } catch {
      return enqueueSnackbar("Ha ocurrido un error", {
        variant: "error",
      });
    }
  }, [loadApi]);

  const goDetailsIngredients = (rute: string) => {
    if (user) {
      navigate(`/home/details/ingredients/${encrypt(rute)}`);
    } else {
      return enqueueSnackbar(
        "Para obtener detalles del ingrediente debe iniciar sesión ",
        {
          variant: "warning",
          autoHideDuration: 3000,
        }
      );
    }
  };

  useEffect(() => {
    getIngredientsPopular();
    if (currentPopularCocktail.length === 0) {
      getCocktailPopular();
    } else {
      setPopularCocktail(currentPopularCocktail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    popularCocktail,
    popularIngredients,
    goDetails,
    goDetailsIngredients,
    loading: loadingApi.includes("POST__random.php"),
  };
};

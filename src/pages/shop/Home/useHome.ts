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
    strInstructions: string;
  }[];
}

export default () => {
  const user = useUserStore((state) => state.user);
  const { loadApi, loadingApi } = useApi();
  const navigate = useNavigate();
  const [popularCocktail, setPopularCocktail] = useState<IProducts[]>();

  const getCocktailPopular = useCallback(async () => {
    try {
      /* In this case, the endpoint for getting a popular cocktail is premium, so I'll request four random cocktails. */
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
          descriptions: drinks.strInstructions,
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
      navigate(`/home/details/${encrypt(rute)}`);
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

  useEffect(() => {
    getCocktailPopular();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    popularCocktail,
    goDetails,
    loading: loadingApi.includes("POST__login"),
  };
};

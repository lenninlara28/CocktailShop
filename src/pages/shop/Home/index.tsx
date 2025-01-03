import { Backdrop, CardProduct, Filters, SliderProduct } from "@components";
import useHome from "./useHome";
import { useUserStore } from "@stores";
import { useEffect } from "react";

export const Home = () => {
  const {
    popularCocktail,
    popularIngredients,
    loading,
    cocktails,
    ingredients,
    goDetails,
    goDetailsIngredients,

    /* Filters */
    cocktailsAlcoholic,
    setCocktailsAlcoholic,
    getCocktailAlcoholic,
    cocktailsNoAlcoholic,
    setCocktailsNoAlcoholic,
    getCocktailNoAlcoholic,
    cocktailsOrdinaries,
    setCocktailsOrdinaries,
    getCocktailOrdinaries,
    filterCocktails,
    setFilterCocktails,
    getCocktailFilter,
    cocktailGlass,
    setCocktailGlass,
    getCocktaiGlass,
    champagneFlute,
    setChampagneFlute,
    getChampagneFlute,
  } = useHome();

  const filters = useUserStore((state) => state.filters);

  const setPopularCocktailsStorage = useUserStore(
    ({ setPopularCocktails }) => setPopularCocktails
  );

  const currentPopularCocktail = useUserStore(
    (state) => state.popularCocktails
  );

  const searching = useUserStore((state) => state.searching);

  if (
    popularCocktail &&
    popularCocktail.length === 4 &&
    currentPopularCocktail.length === 0
  ) {
    setPopularCocktailsStorage(popularCocktail);
  }

  useEffect(() => {
    if (filters.find((item) => item === "Alcohólicas")) {
      getCocktailAlcoholic();
    } else setCocktailsAlcoholic([]);

    if (filters.find((item) => item === "No_Alcohólicas")) {
      getCocktailNoAlcoholic();
    } else setCocktailsNoAlcoholic([]);

    if (filters.find((item) => item === "Bebídas_ordinárias")) {
      getCocktailOrdinaries();
    } else setCocktailsOrdinaries([]);

    if (filters.find((item) => item === "Cocteles")) {
      getCocktailFilter();
    } else setFilterCocktails([]);

    if (filters.find((item) => item === "Copa_de_coctel")) {
      getCocktaiGlass();
    } else setCocktailGlass([]);

    if (filters.find((item) => item === "Copa_de_champagne")) {
      getChampagneFlute();
    } else setChampagneFlute([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  return (
    <div className="bg-white overflow-x-hidden max-w-[1230px] mx-auto">
      <Backdrop isLoading={loading} />
      {/* Filter */}
      <Filters />
      {filters.length === 0 ? (
        <>
          {/* Title search */}
          {searching !== "" && (
            <div className="p-10 pb-0">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Resultado: {searching}
              </h2>
            </div>
          )}

          {/* Popular Cocktail */}

          <div className="p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Cocteles Populares
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {popularCocktail
                ?.filter((item) =>
                  searching !== ""
                    ? item.name
                        ?.toLowerCase()
                        ?.includes(searching.toLowerCase())
                    : true
                )
                ?.map((product) => (
                  <CardProduct
                    key={`index-${product.id}`}
                    product={product}
                    goDetails={goDetails}
                  />
                ))}
            </div>
          </div>

          <hr />

          {/* Popular Ingredients  */}

          <div className="p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Ingredientes Populares
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 justify-center sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {popularIngredients
                ?.filter((item) =>
                  searching !== ""
                    ? item.name
                        ?.toLowerCase()
                        ?.includes(searching.toLowerCase())
                    : true
                )
                ?.map((product) => (
                  <CardProduct
                    key={`ingredients-${product.name}`}
                    product={product}
                    goDetails={goDetailsIngredients}
                  />
                ))}
            </div>
          </div>

          <hr />

          {/* Random Cocktails  */}
          <div className="p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Cocteles
            </h2>
            <SliderProduct
              allCocktais={
                cocktails?.filter((item) =>
                  searching !== ""
                    ? item.strDrink
                        ?.toLowerCase()
                        ?.includes(searching.toLowerCase())
                    : true
                ) || []
              }
              goDetails={goDetails}
            />
          </div>

          <hr />

          {/* Ramdon Ingredients  */}
          <div className="p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Ingredientes
            </h2>

            <SliderProduct
              allCocktais={
                ingredients?.filter((item) =>
                  searching !== ""
                    ? item.name
                        ?.toLowerCase()
                        ?.includes(searching.toLowerCase())
                    : true
                ) || []
              }
              goDetails={goDetailsIngredients}
            />
          </div>
        </>
      ) : (
        <>
          {/* Filters Cocktails Alcoholics */}
          <div className="p-10">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
              Filtrados
            </h2>
            <SliderProduct
              allCocktais={
                [
                  ...cocktailsAlcoholic,
                  ...cocktailsNoAlcoholic,
                  ...cocktailsOrdinaries,
                  ...filterCocktails,
                  ...cocktailGlass,
                  ...champagneFlute,
                ]?.filter((item) =>
                  searching !== ""
                    ? item.strDrink
                        ?.toLowerCase()
                        ?.includes(searching.toLowerCase())
                    : true
                ) || []
              }
              goDetails={goDetails}
            />
          </div>

          <hr />
        </>
      )}
    </div>
  );
};

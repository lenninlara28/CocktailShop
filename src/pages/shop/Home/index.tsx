import { Backdrop, CardProduct, SliderProduct } from "@components";
import useHome from "./useHome";
import { useUserStore } from "@stores";

export const Home = () => {
  const {
    popularCocktail,
    popularIngredients,
    loading,
    cocktails,
    ingredients,
    goDetails,
    goDetailsIngredients,
  } = useHome();

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

  return (
    <div className="bg-white overflow-x-hidden">
      <Backdrop isLoading={loading} />

      {searching !== "" && (
        <div className="p-10 pb-0">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Resultado: {searching}
          </h2>
        </div>
      )}

      {/* Popular Cocktail */}
      {searching === "" && (
        <div className="p-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Cocteles Populares
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {popularCocktail?.map((product) => (
              <CardProduct
                key={`index-${product.id}`}
                product={product}
                goDetails={goDetails}
              />
            ))}
          </div>
        </div>
      )}

      <hr />

      {/* Popular Ingredients  */}
      {searching === "" && (
        <div className="p-10">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Ingredientes Populares
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {popularIngredients?.map((product) => (
              <CardProduct
                key={`ingredients-${product.name}`}
                product={product}
                goDetails={goDetailsIngredients}
              />
            ))}
          </div>
        </div>
      )}

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
                ? item.name?.toLowerCase()?.includes(searching.toLowerCase())
                : true
            ) || []
          }
          goDetails={goDetailsIngredients}
        />
      </div>
    </div>
  );
};

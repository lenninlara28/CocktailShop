import { Backdrop, CardProduct, SliderProduct } from "@components";
import useHome from "./useHome";
import { useUserStore } from "@stores";

export const Home = () => {
  const {
    popularCocktail,
    popularIngredients,
    loading,
    cocktails,
    goDetails,
    goDetailsIngredients,
  } = useHome();

  const setPopularCocktailsStorage = useUserStore(
    ({ setPopularCocktails }) => setPopularCocktails
  );

  const currentPopularCocktail = useUserStore(
    (state) => state.popularCocktails
  );

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
      {/* Popular Cocktail */}
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

      <hr />

      {/* Popular Ingredients  */}
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

      <hr />

      {/* Random Cocktails  */}
      <div className="p-10">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Cocteles
        </h2>
        <SliderProduct allCocktais={cocktails || []} goDetails={goDetails} />
      </div>

      <hr />

      {/* Ramdon Ingredients  */}
      <div className="p-10">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Ingredientes
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {popularIngredients?.map((product) => (
            <CardProduct
              key={`ramdon-ingredients-${product.name}`}
              product={product}
              goDetails={goDetailsIngredients}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

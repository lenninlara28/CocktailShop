import { Backdrop, CardProduct } from "@components";
import useHome from "./useHome";
import { useUserStore } from "@stores";

export const Home = () => {
  const { popularCocktail, goDetails, loading } = useHome();

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
    </div>
  );
};

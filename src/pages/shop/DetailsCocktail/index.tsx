import { Backdrop, Breadcrumb } from "@components";
import useDetailsCocktail from "./useDetailsCocktail";

export const DetailsCocktail = () => {
  const { detailsCocktail, loading } = useDetailsCocktail();

  const breadcrumbs = [
    { id: "1", name: "Home", href: "/home" },
    { id: "2", name: `${detailsCocktail?.name}`, href: "" },
  ];

  return (
    <div className="bg-white overflow-x-hidden">
      <Backdrop isLoading={loading} />
      <div className="pt-10">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <Breadcrumb breadcrumbs={breadcrumbs} />
          </ol>
        </nav>

        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-0  lg:pt-45px">
          {/* Name title */}
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {detailsCocktail?.name}
            </h1>
          </div>

          {/* Image */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <img
              alt={detailsCocktail?.imageAlt}
              src={detailsCocktail?.imageSrc}
              className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-96"
            />
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  {detailsCocktail?.description}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">
                Ingredientes
              </h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  {detailsCocktail?.ingredients.map((ingredient) => (
                    <li key={ingredient} className="text-gray-400">
                      <span className="text-gray-600">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-sm font-medium text-gray-900">Tipo:</h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">{detailsCocktail?.type}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

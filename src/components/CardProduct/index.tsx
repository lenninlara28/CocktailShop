import { IProducts } from "interfaces/general";
import React from "react";

interface CardProductProps {
  product: IProducts;
  goDetails: (idProduct: string) => void;
}

export const CardProduct: React.FC<CardProductProps> = ({
  product,
  goDetails,
}) => {
  return (
    <div
      key={product.id}
      className="group relative cursor-pointer"
      onClick={() => goDetails(product.id)}
    >
      <img
        alt={product.imageAlt}
        src={product.imageSrc}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span className="text-black hover:text-gray-700 hover:underline">
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </span>
          </h3>
          <p className="mt-1 text-sm text-gray-500 line-clamp-3">
            {product.descriptions}
          </p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
    </div>
  );
};
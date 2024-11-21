import { CardProduct } from "@components";
import { IProducts } from "interfaces/general";
import React, { useState } from "react";

interface SliderProductProps {
  allCocktais: IProducts[];
  goDetails: (idProduct: string) => void;
}

export const SliderProduct: React.FC<SliderProductProps> = ({
  allCocktais,
  goDetails,
}) => {
  const [currentIndex, setCurrentIndex] = useState({ min: 0, max: 4 });

  const handlePrev = () => {
    if (currentIndex.max === allCocktais.length) {
      setCurrentIndex({
        min: currentIndex.min - 4,
        max: currentIndex.min,
      });
    } else {
      setCurrentIndex({
        min: currentIndex.min - 4,
        max: currentIndex.max - 4,
      });
    }
  };

  const handleNext = () => {
    if (currentIndex.max + 4 < allCocktais.length) {
      setCurrentIndex({
        min: currentIndex.max,
        max: currentIndex.max + 4,
      });
    } else {
      setCurrentIndex({
        min: currentIndex.max,
        max: allCocktais.length,
      });
    }
  };
  return (
    <div className="relative overflow-hidden w-full mt-8">
      <div className="grid grid-cols-5 ml-52 gap-5 transition-transform duration-500 ease-in-out">
        {allCocktais
          .slice(currentIndex.min, currentIndex.max)
          .map((product) => (
            <CardProduct
              key={`ingredients-${product.name}`}
              product={product}
              goDetails={goDetails}
            />
          ))}
      </div>

      {/* Buttons */}
      <button
        className="absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        onClick={handlePrev}
        disabled={currentIndex.min === 0}
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
        onClick={handleNext}
        disabled={currentIndex.max === allCocktais.length}
      >
        &#8250;
      </button>
    </div>
  );
};

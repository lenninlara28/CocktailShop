import { CardProduct } from "@components";
import { useUserStore } from "@stores";
import { IProducts } from "interfaces/general";
import React, { useEffect, useState } from "react";

interface SliderProductProps {
  allCocktais: IProducts[];
  goDetails: (idProduct: string) => void;
}

export const SliderProduct: React.FC<SliderProductProps> = ({
  allCocktais,
  goDetails,
}) => {
  const [currentIndex, setCurrentIndex] = useState({ min: 0, max: 4 });
  const [currentIndex_SM, setCurrentIndex_SM] = useState({ min: 0, max: 1 });
  const [isSmallScreen, setIsSmallScreen] = useState(
    !window.matchMedia("(min-width: 640px)").matches
  );

  const filters = useUserStore((state) => state.filters);

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
    if (allCocktais.length <= 4) return;
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

  const handlePrev_SM = () => {
    if (currentIndex_SM.max === allCocktais.length) {
      setCurrentIndex_SM({
        min: currentIndex_SM.min - 1,
        max: currentIndex_SM.min,
      });
    } else {
      setCurrentIndex_SM({
        min: currentIndex_SM.min - 1,
        max: currentIndex_SM.max - 1,
      });
    }
  };

  const handleNext_SM = () => {
    if (allCocktais.length <= 4) return;
    if (currentIndex_SM.max + 1 < allCocktais.length) {
      setCurrentIndex_SM({
        min: currentIndex_SM.max,
        max: currentIndex_SM.max + 1,
      });
    } else {
      setCurrentIndex_SM({
        min: currentIndex_SM.max,
        max: allCocktais.length,
      });
    }
  };

  useEffect(() => {
    setCurrentIndex({ min: 0, max: 4 });
    setCurrentIndex_SM({ min: 0, max: 1 });
  }, [filters]);

  const changeView = () => {
    setIsSmallScreen(!window.matchMedia("(min-width: 640px)").matches);
  };

  useEffect(() => {
    window.addEventListener("resize", changeView);
    return () => {
      window.removeEventListener("resize", changeView);
    };
  }, []);

  return (
    <div className="relative overflow-hidden w-full mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:ml-52 gap-5 transition-transform duration-500 ease-in-out">
        {allCocktais.length > 0 ? (
          allCocktais
            .slice(
              isSmallScreen ? currentIndex_SM.min : currentIndex.min,
              isSmallScreen ? currentIndex_SM.max : currentIndex.max
            )
            .map((product) => (
              <CardProduct
                key={`ingredients-${product.name}`}
                product={product}
                goDetails={goDetails}
              />
            ))
        ) : (
          <h2>No hay resultados</h2>
        )}
      </div>

      {/* Buttons */}
      {allCocktais.length > 0 && (
        <>
          <button
            className="absolute top-1/2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            onClick={isSmallScreen ? handlePrev_SM : handlePrev}
            disabled={
              isSmallScreen ? currentIndex_SM.min === 0 : currentIndex.min === 0
            }
          >
            &#8249;
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full hover:bg-gray-700"
            onClick={isSmallScreen ? handleNext_SM : handleNext}
            disabled={
              isSmallScreen
                ? currentIndex_SM.max === allCocktais.length
                : currentIndex.max === allCocktais.length
            }
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
};

import React, { useEffect, useState } from "react";
import filterIcon from "../../assets/filter_icon.png";
import { useUserStore } from "@stores";

export const Filters: React.FC = () => {
  const setFilters = useUserStore(({ setFilters }) => setFilters);
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const [options, setOptions] = useState<
    { option: string; selected: boolean }[]
  >([
    { option: "Alcohólicas", selected: false },
    { option: "No_Alcohólicas", selected: false },
    { option: "Bebídas_ordinárias", selected: false },
    { option: "Cocteles", selected: false },
    { option: "Copa_de_coctel", selected: false },
    { option: "Copa_de_champagne", selected: false },
  ]);

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  const handleCheckboxChange = (index: number) => {
    options.map((item, indice) => {
      if (indice === index) {
        item.selected = !item.selected;
        return item;
      }
    });
    setOptions([...options]);
  };

  const handleFilter = () => {
    setFilters(
      options.filter((item) => item.selected).map((item) => item.option)
    );
  };

  useEffect(() => {
    setFilters([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="p-5 pb-0 flex w-screen justify-end">
        <button
          onClick={() => handleOpenFilters()}
          className="rounded-full bg-white border-none text-black ml-1 flex items-center gap-1"
        >
          Filtrar
          <img src={filterIcon} alt="i" className="w-5" />
        </button>
      </div>

      {/* Filter container */}
      {openFilters && (
        <div className="mb-0 m-10 border rounded-xl border-gray">
          <h2 className="text-xl ml-5 mt-2">Tipos de bebidas</h2>
          <div className="grid grid-cols-1 ml-5 lg:grid-cols-3 justify-items-start items-center h-20">
            {options.map((option, index) => (
              <label
                key={option.option}
                className="flex items-center space-x-2"
              >
                <input
                  type="checkbox"
                  checked={option.selected}
                  onChange={() => handleCheckboxChange(index)}
                  className="form-checkbox h-5 w-5 text-black rounded border-gray-300 focus:ring focus:ring-black"
                />
                <span className="text-gray-800">
                  {option.option.includes("_")
                    ? option.option.replace(/_/g, " ")
                    : option.option}
                </span>
              </label>
            ))}
          </div>
          <div className="flex w-full justify-end">
            <button
              onClick={() => handleFilter()}
              className="rounded-full bg-black border-none text-white mr-5 mb-1"
            >
              Filtrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

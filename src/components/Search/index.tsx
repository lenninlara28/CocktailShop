import React, { useState } from "react";
import { useUserStore } from "@stores";

export const Search: React.FC = () => {
  const searching = useUserStore((state) => state.searching);
  const [search, setSearch] = useState<string>(searching);

  const setSearching = useUserStore(({ setSearching }) => setSearching);

  const handlesearch = () => {
    setSearching(search);
  };

  const handleChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      setSearching("");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handlesearch();
    }
  };

  return (
    <div className="flex-1 flex-row hidden lg:flex">
      <input
        type="text"
        placeholder="Buscar cocteles e ingredientes..."
        value={search}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="w-full text-white bg-transparent border border-white rounded-lg focus:outline-0"
      />
      <button
        onClick={() => handlesearch()}
        className="rounded-full bg-black border-none text-white ml-1"
      >
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="size-6 fill-white"
        >
          <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
        </svg>
      </button>
    </div>
  );
};

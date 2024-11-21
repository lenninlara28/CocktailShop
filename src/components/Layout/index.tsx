import React, { useState } from "react";
import logo from "../../../public/cocktail.svg";
import { useNavigate } from "react-router-dom";
import { User } from "interfaces/general";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";

interface Props {
  children: JSX.Element | JSX.Element[];
  user: User | null;
  logout: () => void;
}

export const Layout: React.FC<Props> = ({ children, user, logout }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const action = (snackbarId: SnackbarKey) => (
    <div className="flex gap-5">
      <button
        className="flex w-full justify-center rounded-xl"
        onClick={() => {
          closeSnackbar(snackbarId);
          logout();
        }}
      >
        Si
      </button>
      <button
        className="flex w-full justify-center rounded-xl bg-white text-black"
        onClick={() => {
          closeSnackbar(snackbarId);
        }}
      >
        No
      </button>
    </div>
  );

  const logoutSession = () => {
    setIsOpen(false);
    enqueueSnackbar("¿Seguro que desea cerrar sesión?", {
      variant: "default",
      action,
      persist: true,
    });
  };

  return (
    <div className="flex w-screen h-screen flex-col">
      <header className="bg-black ">
        <nav className="mx-auto flex justify-center items-center max-w-7xl p-2 lg:px-8 pb-2 gap-10">
          {/* Logo */}
          <div
            className="-m-1.5 p-1.5 flex flex-col cursor-pointer"
            onClick={() => navigate("/home")}
          >
            <img alt="logo" src={logo} className="h-8 w-auto" />
            <span className="text-white text-sm ">CocktailShop</span>
          </div>

          {/* Search */}
          <div className="flex-1 flex-row hidden lg:flex">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-full text-white bg-transparent border border-white rounded-lg focus:outline-0"
            />
            <button className="rounded-full bg-black border-none text-white ml-1">
              <svg
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="size-6 fill-white"
              >
                <path d="M20.47 21.53a.75.75 0 1 0 1.06-1.06l-1.06 1.06Zm-9.97-4.28a6.75 6.75 0 0 1-6.75-6.75h-1.5a8.25 8.25 0 0 0 8.25 8.25v-1.5ZM3.75 10.5a6.75 6.75 0 0 1 6.75-6.75v-1.5a8.25 8.25 0 0 0-8.25 8.25h1.5Zm6.75-6.75a6.75 6.75 0 0 1 6.75 6.75h1.5a8.25 8.25 0 0 0-8.25-8.25v1.5Zm11.03 16.72-5.196-5.197-1.061 1.06 5.197 5.197 1.06-1.06Zm-4.28-9.97c0 1.864-.755 3.55-1.977 4.773l1.06 1.06A8.226 8.226 0 0 0 18.75 10.5h-1.5Zm-1.977 4.773A6.727 6.727 0 0 1 10.5 17.25v1.5a8.226 8.226 0 0 0 5.834-2.416l-1.061-1.061Z"></path>
              </svg>
            </button>
          </div>

          {/* User */}
          <div className="-m-1.5 p-1.5 flex flex-col">
            {user ? (
              <div
                className="-m-1.5 p-1.5 flex flex-row items-center gap-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span className="text-white text-sm ">{user.nombres}</span>
                <img
                  src={user.imagen}
                  alt="Avatar"
                  className="w-9 h-9 rounded-full"
                />
              </div>
            ) : (
              <button
                className="flex w-full justify-center rounded-xl bg-black-600 px-3 py-1.5 text-sm/6 font-semibold bg-white text-black shadow-sm hover:bg-black hover:text-white hover:border-white"
                onClick={() => navigate("/auth/login")}
              >
                Iniciar sesión
              </button>
            )}

            {/* Menu Drawe */}
            {isOpen && (
              <div
                className={`absolute right-4 mt-12 w-30 bg-white rounded-lg shadow-lg`}
              >
                <ul className="p-4 space-y-4">
                  <li>
                    <button
                      onClick={logoutSession}
                      className="block bg-white hover:bg-none hover:border-white rounded peer-focus-within:border-white"
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>
      </header>
      {children}
    </div>
  );
};

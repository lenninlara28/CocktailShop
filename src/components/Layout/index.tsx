import React, { useEffect, useRef, useState } from "react";
import logo from "../../../public/cocktail.svg";
import { useNavigate } from "react-router-dom";
import { User } from "interfaces/general";
import { closeSnackbar, enqueueSnackbar, SnackbarKey } from "notistack";
import { Search } from "@components";

interface Props {
  children: JSX.Element | JSX.Element[];
  user: User | null;
  logout: () => void;
}

export const Layout: React.FC<Props> = ({ children, user, logout }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const refDrawer = useRef<HTMLDivElement>(null);

  /*  buttons confir logout */
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

  /* logout clic */
  const logoutSession = () => {
    setIsOpen(false);
    enqueueSnackbar("¿Seguro que desea cerrar sesión?", {
      variant: "default",
      action,
      persist: true,
    });
  };

  const handleClickoutMenuPopup = (e: MouseEvent) => {
    if (refDrawer.current && !refDrawer.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickoutMenuPopup, true);
    return () => {
      document.addEventListener("click", handleClickoutMenuPopup, true);
    };
  }, []);

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
          <Search />

          {/* User */}
          <div className="-m-1.5 p-1.5 flex flex-col">
            {user ? (
              <div
                className="-m-1.5 p-1.5 flex flex-row items-center gap-3 cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="flex flex-col">
                  <span className="text-white text-sm">{user.nombres}</span>
                  <span className="text-white text-xs">{user.email}</span>
                </div>
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
                ref={refDrawer}
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

import { localStorageAPI } from "../storages/";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Action, ISignInProps, State } from "./user.interface";
import { immer } from "zustand/middleware/immer";
import { User } from "interfaces/general";

const initialState: State = {
  token: null,
  user: null,
};

const storeAPI: StateCreator<State & Action, [["zustand/devtools", never]]> = (
  set
) => ({
  ...initialState,
  signIn: (data: ISignInProps) => set(() => data, false, "signIn"),
  logOut: () => set(() => initialState, false, "logOut"),
  updateUser: (user: User) => set(() => ({ user }), false, "updateUser"),
});

export const useUserStore = create<State & Action>()(
  devtools(
    persist(immer(storeAPI), {
      skipHydration: true,
      name: "data",
      storage: localStorageAPI,
    })
  )
);

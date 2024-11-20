import { localStorageAPI } from "../storages/";
import { StateCreator, create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Action, ISignInProps, State } from "./user.interface";
import { immer } from "zustand/middleware/immer";
import { IUserDummy, User } from "interfaces/general";
import dataDummy from "../../utils/users.json";

const initialState: State = {
  token: null,
  user: null,
  dummyUsers: dataDummy,
};

const storeAPI: StateCreator<State & Action, [["zustand/devtools", never]]> = (
  set
) => ({
  ...initialState,
  signIn: (data: ISignInProps) => set(() => data, false, "signIn"),
  signUp: (dummyUsers: { users: IUserDummy[] }) =>
    set(() => ({ dummyUsers }), false, "signUp"),
  logOut: (initialState: State) => set(() => initialState, false, "logOut"),
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

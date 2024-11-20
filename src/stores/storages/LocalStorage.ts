import {
  PersistStorage,
  StateStorage,
  createJSONStorage,
} from "zustand/middleware";

export const localStorageAPI: PersistStorage<StateStorage> | undefined =
  createJSONStorage(() => ({
    getItem: function (name: string): string | Promise<string | null> | null {
      return localStorage.getItem(name);
    },
    setItem: function (name: string, value: string): void | Promise<void> {
      localStorage.setItem(name, value);
    },
    removeItem: function (name: string): void | Promise<void> {
      localStorage.removeItem(name);
    },
  }));

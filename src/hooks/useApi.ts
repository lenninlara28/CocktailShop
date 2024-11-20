import { useState } from "react";
import axios, { AxiosError, AxiosRequestConfig, Method } from "axios";
import { apiAuth, apiCocktail } from "@api";
import { useUserStore } from "@stores";

export type IHeaderPropsAPI = {
  "access-token": string | undefined;
  "Content-Type": string | undefined;
};

export interface IRequestProp extends AxiosRequestConfig {
  headers: IHeaderPropsAPI;
  method: Method;
}

export interface ILoadApiProps {
  endpoint: string;
  token?: boolean;
  type: Method;
  instance?: string;
  body?: unknown;
  headers?: IHeaderPropsAPI;
  abortController?: AbortController;
}

export interface IErrors {
  type: string;
  value: string;
  msg: string;
  path: string;
  location: string;
}

export const useApi = () => {
  const [loadingApi, setLoading] = useState<string[]>([]);
  const { localToken } = useUserStore((state) => ({
    localToken: state.token,
    logOut: state.logOut,
  }));

  const loadApi = async <R extends object>({
    type = "GET",
    endpoint,
    token,
    body,
    instance,
    headers = {
      "access-token": undefined,
      "Content-Type": undefined,
    },
    abortController = new AbortController(),
  }: ILoadApiProps): Promise<R> => {
    setLoading([...loadingApi, `${type}__${endpoint}`]);

    try {
      if (token && localToken) {
        if (localToken.length === 0) {
          throw new Error("No has iniciado sesión.");
        }
        headers["access-token"] = localToken;
      }

      const config: IRequestProp = {
        method: type,
        url: endpoint,
        headers: headers,
        signal: abortController.signal,
      };

      if (body) {
        config.data = body;
      }

      let response;
      switch (instance) {
        case "api_auth":
          response = await apiAuth<R>(config).then((res) => res.data);
          break;
        case "api_cocktail":
          response = await apiCocktail<R>(config).then((res) => res.data);
          break;
        default:
          response = await axios(config).then((res) => res.data);
          break;
      }

      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      return response;
    } catch (error) {
      setLoading((prevState) =>
        prevState.filter((item) => item !== `${type}__${endpoint}`)
      );
      if (error instanceof AxiosError) {
        if (error.response?.data.errors) {
          const listMsg: string[] = error.response?.data.errors.map(
            ({ msg }: IErrors) => msg
          );
          throw new Error(listMsg.join(", "));
        } else {
          throw new Error(
            "Error de conexión, actualiza la página e intente nuevamente."
          );
        }
      } else {
        throw new Error(
          "Error de conexión, actualiza la página e intente nuevamente."
        );
      }
    }
  };

  return {
    loadApi,
    loadingApi,
    loggedApi: Boolean(localToken),
  };
};

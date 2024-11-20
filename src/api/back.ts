import axios from "axios";

export const URL_Auth = "https://dummyjson.com/auth/";
export const apiAuth = axios.create({
  baseURL: URL_Auth,
});

export const baseURLA_Cocktail = "https://www.thecocktaildb.com/api/json/v1/1/";
export const apiCocktail = axios.create({
  baseURL: baseURLA_Cocktail,
});

export type InputText = React.ChangeEvent<HTMLInputElement>;

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  imagen?: string;
}

export type PropsComponent = {
  children: JSX.Element | JSX.Element[];
};

export interface IGeneralError {
  message: string;
  stack: string;
}

export interface IUserDummy {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  password: string;
  dummyAuthEmail: string;
  dummyAuthPassword: string;
  username?: string;
}

export interface IProducts {
  id: string;
  name: string;
  imageSrc: string;
  imageAlt: string;
  price: string;
  descriptions: string;
  strDrinkThumb?: string;
  idDrink?: string;
  strDrink?: string;
  strInstructionsES?: string;
}

export interface IDetailsCocktail {
  name: string;
  imageAlt: string;
  imageSrc: string;
  description: string;
  ingredients: string[];
  type: string;
}

export interface IDetailsIngredient {
  name: string;
  description: string;
  type: string;
  imageSrc: string;
  cocktails: IProducts[];
}

export type InputText = React.ChangeEvent<HTMLInputElement>;

export interface User {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
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

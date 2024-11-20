import { User } from "interfaces/general";

export interface ISignInProps {
  user: User;
  token: string;
}

export interface State {
  user: User | null;
  token: string | null;
}

export interface Action {
  signIn: (props: ISignInProps) => void;
  logOut: () => void;
}

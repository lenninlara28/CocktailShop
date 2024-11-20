import { IUserDummy, User } from "interfaces/general";

export interface ISignInProps {
  user: User;
  token: string;
}

export interface State {
  user: User | null;
  token: string | null;
  dummyUsers: { users: IUserDummy[] };
}

export interface Action {
  signIn: (props: ISignInProps) => void;
  logOut: (props: State) => void;
  signUp: (props: { users: IUserDummy[] }) => void;
}

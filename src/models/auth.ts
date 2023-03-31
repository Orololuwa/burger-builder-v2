import { IBaseStoreState } from "./base";

export interface AuthState {
  isLoggedIn: boolean;
  loading: boolean;
  error: string;
  profile: IBaseStoreState<IUser | null>;
}

export interface ILogin {
  user: IUser;
  access_token: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
}

export interface AuthLocationState {
  from?: {
    pathname?: string;
  };
}

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
  firstName: string;
  lastName: string;
  middleName?: string;
  email: string;
  phone: string;
  password: string;
  role: string;
}

export interface AuthLocationState {
  from?: {
    pathname?: string;
  };
}

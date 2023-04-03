import { IBaseStoreState } from "./base";

export interface IAddress {
  id: number;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
  primaryAddress: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ICreateAddres = Pick<
  IAddress,
  "houseNumber" | "city" | "street" | "state" | "zipCode" | "country"
>;

export interface IAddressState {
  allAddress: IBaseStoreState<IAddress[]>;
}

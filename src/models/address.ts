import { IBaseStoreState } from "./base";

export interface IAddress {
  id: number;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  primaryAddress: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ICreateAddres = Pick<
  IAddress,
  "houseNumber" | "city" | "street" | "state" | "zipCode"
>;

export interface IAddressState {
  allAddress: IBaseStoreState<IAddress[]>;
}

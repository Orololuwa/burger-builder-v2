import { IBaseStoreState } from "./base";

export interface IIngredient {
  id: number;
  name: string;
  price: string;
}

export interface IIngredientState {
  allIngredients: IBaseStoreState<IIngredient[]>;
}

export interface IIngredientObject {
  count: number;
  price: string;
  visible: boolean;
}

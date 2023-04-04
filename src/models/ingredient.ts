import { IBaseStoreState, IObjectGeneric } from "./base";

export interface IIngredient {
  id: number;
  name: string;
  price: string;
}

export interface IIngredientState {
  allIngredients: IBaseStoreState<IIngredient[]>;
  formattedIngredients: IObjectGeneric<IIngredientObject>[];
  activePack: number;
}

export interface IIngredientObject {
  count: number;
  price: string;
  visible: boolean;
}

export interface ICreateOrder {
  price: number;
  ingredients: Ingredient[];
  addressId: number;
}

interface Ingredient {
  menuItemId: number;
  packNumber: number;
  pricePurchased: number;
  quantity: number;
}

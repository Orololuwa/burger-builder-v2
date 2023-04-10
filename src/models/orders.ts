import { IAddress } from "./address";
import { IBaseStoreState, IPagination } from "./base";

export interface IOrderRoot {
  data: IOrder[];
  pagination: IPagination;
}

export interface IOrder {
  id: number;
  price: number;
  deliveryMethod?: string;
  createdAt: string;
  address: IAddress;
  menuItemPurchase: MenuItemPurchase[];
}

export interface MenuItemPurchase {
  id: number;
  quantity: number;
  pricePurchased: string;
  packNumber: number;
  menuItem: MenuItem;
}

export interface MenuItem {
  id: number;
  name: string;
}

export interface IOrdersState {
  allOrders: IBaseStoreState<IOrder[]> & { pagination: IPagination };
}

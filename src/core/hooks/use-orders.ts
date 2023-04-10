import { useAppDispatch, useAppSelector } from "./use-redux";
import { getAllOrders } from "store/action-creators/orders.actions";
import { IPaginationParams } from "models/base";

export const useOrders = () => {
  const allOrders = useAppSelector((state) => state.orders.allOrders);

  const dispatch = useAppDispatch();

  const getOrders = (params: IPaginationParams) => {
    dispatch(getAllOrders(params));
  };

  return {
    allOrders,
    getOrders
  };
};

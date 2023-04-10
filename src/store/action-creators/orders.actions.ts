import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { errorDispatchHandler } from "lib/utils";
import { IPaginationParams } from "models/base";
import ordersService from "services/orders.service";
import { orderActions } from "store/reducers/orders.reducers";

export const getAllOrders = (params: IPaginationParams) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(orderActions.getAllOrdersBegin());

      const res = await ordersService.getOrders(params);

      dispatch(orderActions.getAllOrdersSuccess(res.data));
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string | string[] }>;
      const msg = axiosError.response?.data?.message;

      errorDispatchHandler(msg, orderActions.getAllOrdersError, dispatch);
    }
  };
};

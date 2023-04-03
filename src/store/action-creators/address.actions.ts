import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { errorDispatchHandler } from "lib/utils";
import addressService from "services/address.service";
import { addressActions } from "store/reducers/address.reducers";

export const getAllAddress = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(addressActions.getAllAddressBegin());

      const res = await addressService.getAddress();

      dispatch(addressActions.getAllAddressSuccess(res.data.data));
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string | string[] }>;
      const msg = axiosError.response?.data?.message;

      errorDispatchHandler(msg, addressActions.getAllAddressError, dispatch);
    }
  };
};

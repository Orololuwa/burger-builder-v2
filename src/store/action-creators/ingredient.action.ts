import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { errorDispatchHandler } from "lib/utils";
import ingredientService from "services/ingredient.service";
import { ingredientActions } from "store/reducers/ingredient.reducers";

export const getAllIngredients = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(ingredientActions.getAllIngredientsBegin());

      const res = await ingredientService.getIngredients();

      dispatch(ingredientActions.getAllIngredientsSuccess(res.data.data));
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string | string[] }>;
      const msg = axiosError.response?.data?.message;

      errorDispatchHandler(
        msg,
        ingredientActions.getAllIngredientsError,
        dispatch
      );
    }
  };
};

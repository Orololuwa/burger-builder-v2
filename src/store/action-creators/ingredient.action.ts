import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
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
      typeof msg === "string"
        ? dispatch(ingredientActions.getAllIngredientsError(msg || "Error"))
        : ingredientActions.getAllIngredientsError(
            msg?.length ? msg[0] : "Error"
          );
    }
  };
};

import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { ExpirySession, tokenKey } from "lib/utils";
import { NavigateFunction } from "react-router-dom";
import authService from "services/auth.service";
import { actions } from "store/reducers/auth.reducers";

export const login2FA = (
  navigate: NavigateFunction,
  from: string,
  data: {
    email: string;
    password: string;
  }
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(actions.loginBegin());

      const res = await authService.login(data);

      ExpirySession.set(tokenKey, res.data.access_token);

      dispatch(actions.loginSuccess(true));
      navigate(from, { replace: true });
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      dispatch(actions.loginError(msg || "Error"));
    }
  };
};

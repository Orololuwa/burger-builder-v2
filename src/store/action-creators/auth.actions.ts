import { Dispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { appRoutes } from "core/routes/routes";
import { errorDispatchHandler, ExpirySession, tokenKey } from "lib/utils";
import { IUser } from "models/auth";
import { NavigateFunction } from "react-router-dom";
import authService from "services/auth.service";
import { authActions } from "store/reducers/auth.reducers";

export const loginJWT = (
  navigate: NavigateFunction,
  from: string,
  data: {
    email: string;
    password: string;
  }
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.loginBegin());

      const res = await authService.login(data);

      ExpirySession.set(tokenKey, res.data.data.access_token);

      dispatch(authActions.loginSuccess(true));
      navigate(from, { replace: true });
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      errorDispatchHandler(msg, authActions.loginError, dispatch);
    }
  };
};

export const signUpJWT = (
  navigate: NavigateFunction,
  from: string,
  data: Omit<IUser, "id">
) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.loginBegin());

      const res = await authService.signUp(data);

      ExpirySession.set(tokenKey, res.data.data.access_token);

      dispatch(authActions.loginSuccess(true));
      navigate(from, { replace: true });
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string }>;
      const msg = axiosError.response?.data?.message;
      errorDispatchHandler(msg, authActions.loginError, dispatch);
    }
  };
};

export const logOut = (navigate: NavigateFunction) => {
  return async (dispatch: Dispatch) => {
    try {
      ExpirySession.clear();
      dispatch(authActions.logOut());
      navigate(appRoutes.SIGN_IN, { replace: true });
    } catch (err) {
      throw err;
    }
  };
};

export const getProfile = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(authActions.profileBegin());

      const res = await authService.getProfile();

      dispatch(authActions.profileSuccess(res.data.data));
    } catch (err: any) {
      const axiosError = err as AxiosError<{ message: string | string[] }>;
      const msg = axiosError.response?.data?.message;

      errorDispatchHandler(msg, authActions.profileError, dispatch);
    }
  };
};

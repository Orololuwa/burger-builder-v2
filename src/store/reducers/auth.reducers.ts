import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, IUser } from "models/auth";
import { tokenKey, ExpirySession } from "lib/utils";

const initialState: AuthState = {
  isLoggedIn: !!ExpirySession.get(tokenKey),
  loading: false,
  error: "",
  profile: {
    data: null,
    error: "",
    loading: false
  }
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginBegin: (state: AuthState) => {
      state.loading = true;
      state.error = "";
    },
    loginSuccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = false;
      state.isLoggedIn = action.payload;
      state.error = "";
    },
    loginError: (state: AuthState, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logOut: (state: AuthState) => {
      state.isLoggedIn = false;
    },
    profileBegin: (state: AuthState) => {
      state.profile.loading = true;
      state.profile.error = "";
    },
    profileSuccess: (state: AuthState, action: PayloadAction<IUser>) => {
      state.profile.loading = false;
      state.profile.data = action.payload;
      state.profile.error = "";
    },
    profileError: (state: AuthState, action: PayloadAction<string>) => {
      state.profile.loading = false;
      state.profile.error = action.payload;
    }
  }
});

export const authActions = AuthSlice.actions;

export default AuthSlice.reducer;

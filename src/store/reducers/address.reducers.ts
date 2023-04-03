import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAddress, IAddressState } from "models/address";

const initialState: IAddressState = {
  allAddress: {
    loading: false,
    data: [],
    error: ""
  }
};

export const AddressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {
    getAllAddressBegin: (state) => {
      state.allAddress.loading = true;
      state.allAddress.error = "";
    },
    getAllAddressSuccess: (state, action: PayloadAction<IAddress[]>) => {
      state.allAddress.loading = false;
      (state.allAddress.error = ""), (state.allAddress.data = action.payload);
    },
    getAllAddressError: (state, action: PayloadAction<string>) => {
      state.allAddress.loading = false;
      state.allAddress.error = action.payload;
    }
  }
});

export const addressActions = AddressSlice.actions;

export default AddressSlice.reducer;

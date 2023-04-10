import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialPagination } from "lib/helpers";
import { IOrderRoot, IOrdersState } from "models/orders";

const initialState: IOrdersState = {
  allOrders: {
    loading: false,
    data: [],
    error: "",
    pagination: { ...initialPagination, pageSize: 5 }
  }
};

export const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getAllOrdersBegin: (state) => {
      state.allOrders.loading = true;
      state.allOrders.error = "";
    },
    getAllOrdersSuccess: (state, action: PayloadAction<IOrderRoot>) => {
      state.allOrders.loading = false;
      state.allOrders.error = "";
      state.allOrders.data = action.payload.data;
      state.allOrders.pagination = action.payload.pagination;
    },
    getAllOrdersError: (state, action: PayloadAction<string>) => {
      state.allOrders.loading = false;
      state.allOrders.error = action.payload;
    }
  }
});

export const orderActions = OrderSlice.actions;

export default OrderSlice.reducer;

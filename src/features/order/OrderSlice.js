import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./OrderAPI";

const initialState = {
  orders: [],
  status: "idle",
  currentOrder: null,
  selectedAddress: null,
  paymentMethod: "cash",
};

export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order) => {
    const response = await createOrder(order);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const orderSlice = createSlice({
  name: "order",
  initialState,

  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    resetCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setSelectedAddress: (state, action) => {
      state.selectedAddress = action.payload;
    },
    setPaymentMethod: (state, action) => {
      state.selectedAddress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrderAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrderAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      });
  },
});

export const { resetCurrentOrder, setPaymentMethod, setSelectedAddress } =
  orderSlice.actions;

export const selectOrder = (state) => state.order.currentOrder;
export const selectAddress = (state) => state.order.selectedAddress;
export const selectPaymentMethod = (state) => state.order.paymentMethod;

export default orderSlice.reducer;

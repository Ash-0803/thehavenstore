import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
};

export const globalSlice = createSlice({
  name: "global",
  initialState,

  reducers: {
    globalStatusChange: (state, action) => {
      console.log("changing global status to: ", action.payload);
      state.status = action.payload;
    },
  },
});

export const { globalStatusChange } = globalSlice.actions;

export const selectGlobalStatus = (state) => state.global.status;

export default globalSlice.reducer;

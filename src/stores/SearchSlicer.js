import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  searchReset: false,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    triggerSearchReset: (state) => {
      state.searchReset = true;
    },
    clearSearchReset: (state) => {
      state.searchReset = false;
    },
  },
});

export const searchReducer = searchSlice.reducer;
export const { triggerSearchReset, clearSearchReset } = searchSlice.actions;
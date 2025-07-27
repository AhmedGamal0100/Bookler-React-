import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    closedNav: false,
};

export const navSlice = createSlice({
    name: 'verticalNav',
    initialState,
    reducers: {
        setClosedNav: (state) => {
            state.closedNav = !state.closedNav
        },
    }
})

export const navReducer = navSlice.reducer;
export const { setClosedNav } = navSlice.actions;
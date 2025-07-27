import { createSlice } from "@reduxjs/toolkit";
const savedLogged = JSON.parse(sessionStorage.getItem("logged"));
const savedAccount = JSON.parse(localStorage.getItem("registeredUser"))

export const initialState = {
    isLogged: savedLogged || false,
    account: savedAccount || {}
}

export const accSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setAccount: (state, action) => {
            state.account = action.payload;
            localStorage.setItem("registeredUser", JSON.stringify(state.account));
            console.log("Saved account:", state.account);
        },

        setLogged: (state, action) => {
            state.isLogged = action.payload;
            sessionStorage.setItem("logged", JSON.stringify(state.isLogged));
        },

        setRemoveLogged: (state) => {
            state.isLogged = false;
            sessionStorage.removeItem("logged");
        }
    }
})

export const accReducer = accSlice.reducer;
export const { setLogged, setAccount, setRemoveLogged } = accSlice.actions;
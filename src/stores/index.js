import { configureStore } from "@reduxjs/toolkit";
import { navReducer } from "./VerticalNavSlicer";
import { accReducer } from "./AccountSlicer";
import { searchReducer } from "./SearchSlicer";
import { bookingReducer } from "./BookingSlicer";

export const store = configureStore({
    reducer: {
        verticalNav: navReducer,
        account: accReducer,
        search: searchReducer,
        booking: bookingReducer
    },
});
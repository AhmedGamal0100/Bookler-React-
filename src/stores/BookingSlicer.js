import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    dateFrom: '',
    dateTo: '',
    formData: {},
    isPushed: false,
    finalData: {}
};

export const bookingSlice = createSlice({
    name: "booking",
    initialState,
    reducers: {
        setDateFrom: (state, action) => {
            state.dateFrom = action.payload;
        },
        setDateTo: (state, action) => {
            state.dateTo = action.payload;
        },
        setFormData: (state, action) => {
            state.formData = action.payload;
        },
        pushDataInLocalStorage: (state) => {
            const { dateFrom, dateTo, formData } = state;
            state.isPushed = false;

            if (
                dateFrom &&
                dateTo &&
                formData &&
                Object.keys(formData).length > 0
            ) {
                const formattedFormData = {
                    ...formData,
                    expiryDate: formData.expiryDate?.format?.('YYYY-MM-DD') || '',
                    dateFrom: typeof dateFrom === 'object' && dateFrom.format
                        ? dateFrom.format('YYYY-MM-DD')
                        : dateFrom,
                    dateTo: typeof dateTo === 'object' && dateTo.format
                        ? dateTo.format('YYYY-MM-DD')
                        : dateTo,
                };

                const localData = JSON.parse(localStorage.getItem('registeredUser')) || {};
                const existingBookings = localData.bookingList || [];

                const updatedData = {
                    ...localData,
                    bookingList: [...existingBookings, formattedFormData],
                };

                localStorage.setItem('registeredUser', JSON.stringify(updatedData));

                state.isPushed = true;
            } else {
                state.isPushed = false;
            }
        },
        resetStore: (state) => {
            state.dateTo = ''
            state.dateFrom = ''
            state.formData = {}
        },
        clearIsPushed: (state) => {
            state.isPushed = false;
        },
        getDataFromLocalStorage: (state) => {
            const data = localStorage.getItem('registeredUser');
            if (data && data != null) {
                state.finalData = JSON.parse(data);
            }
        }
    },
});

export const bookingReducer = bookingSlice.reducer;
export const {
    setDateFrom,
    setDateTo,
    setFormData,
    pushDataInLocalStorage,
    resetStore,
    clearIsPushed,
    getDataFromLocalStorage
} = bookingSlice.actions;

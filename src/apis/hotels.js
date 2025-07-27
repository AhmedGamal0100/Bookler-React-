import axios from "axios";

export const axiosInstanceHotels = axios.create({
    baseURL: "https://booking-app-db.vercel.app/hotels"
});

let setGlobalLoading = null;

export const setLoadingHandler = (fn) => {
    setGlobalLoading = fn;
};

axiosInstanceHotels.interceptors.request.use(
    (config) => {
        setGlobalLoading(true);
        return config;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);

axiosInstanceHotels.interceptors.response.use(
    (response) => {
        setGlobalLoading(false);
        return response;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);
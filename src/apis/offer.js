import axios from "axios";

export const axiosInstanceOffer = axios.create({
    baseURL: "https://booking-app-db.vercel.app/best_offer"
});

let setGlobalLoading = null;

export const setLoadingHandler = (fn) => {
    setGlobalLoading = fn;
};

axiosInstanceOffer.interceptors.request.use(
    (config) => {
        setGlobalLoading(true);
        return config;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);

axiosInstanceOffer.interceptors.response.use(
    (response) => {
        setGlobalLoading(false);
        return response;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);
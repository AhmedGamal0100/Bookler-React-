import axios from "axios";

export const axiosInstanceRecommended = axios.create({
    baseURL: "https://booking-app-db.vercel.app/recommended_hotels"
});

let setGlobalLoading = null;

export const setLoadingHandler = (fn) => {
    setGlobalLoading = fn;
};

axiosInstanceRecommended.interceptors.request.use(
    (config) => {
        setGlobalLoading(true);
        return config;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);

axiosInstanceRecommended.interceptors.response.use(
    (response) => {
        setGlobalLoading(false);
        return response;
    },
    (error) => {
        setGlobalLoading(false);
        return Promise.reject(error);
    }
);
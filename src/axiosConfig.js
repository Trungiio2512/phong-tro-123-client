import axios from "axios";
import jwt from "jwt-decode";
export const axiosPublic = axios.create({ baseURL: process.env.REACT_APP_SERVER_URL });
const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

// Add a request interceptor
instance.interceptors.request.use(
    function async(config) {
        const token =
            window.localStorage.getItem("persist:auth") &&
            JSON.parse(window.localStorage.getItem("persist:auth"))?.token?.slice(1, -1);
        // if (token) {
        //     const currentDate = new Date();

        //     const decodeToken = jwt(token);
        //     if (decodeToken.exp * 1000 < currentDate.getTime()) {
        //     }
        // }

        config.headers = {
            authorization: token ? `Bearer ${token}` : null,
        };
        return config;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a response interceptor
let refresh = false;
instance.interceptors.response.use(
    function (response) {
        // refresh token
        return response;
    },
    async function (error) {
        console.log(error);
        if (error.response.status === 401 && !refresh) {
            refresh = true;
            // await apiRefresh();
        }
        refresh = false;
        return Promise.reject(error);
    },
);

export default instance;

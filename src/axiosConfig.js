import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});
// Add a request interceptor
axios.interceptors.request.use(
    function (config) {
        // add token to headers
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axios.interceptors.response.use(
    function (response) {
        //refresh token
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);
export default instance;
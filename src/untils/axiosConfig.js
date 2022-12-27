import axios from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});

//config token khi gửi đi
// Thêm một bộ đón chặn request
axios.interceptors.request.use(
    function (config) {
        const token = localStorage.getItem("persist:auth");
        // console.log(token);
        // Làm gì đó trước khi request dược gửi đi
        return config;
    },
    function (error) {
        console.log(error);
        // Làm gì đó với lỗi request
        return Promise.reject(error);
    },
);

export default instance;

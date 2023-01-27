import axios from "axios";
import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/register",
                data: payload,
            });

            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};

export const apiLogin = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/login",
                data: payload,
            });

            resolve(res);
        } catch (error) {
            reject(error);
        }
    });
};
export const apiRefresh = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "post",
                url: "/api/v1/auth/refresh",
            });
            // resolve(res.data)
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    });
};

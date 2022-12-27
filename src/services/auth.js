import axios from "axios";
import axiosConfig from "../untils/axiosConfig";

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

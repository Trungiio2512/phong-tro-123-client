import axios from "axios";
import axiosConfig from "../axiosConfig";

export const getProvinces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/province/",
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

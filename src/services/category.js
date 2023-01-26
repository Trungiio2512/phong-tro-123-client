import axios from "axios";
import axiosConfig from "../axiosConfig";

export const apiGetCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/category",
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

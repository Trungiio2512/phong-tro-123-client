import axios from "axios";
import { axiosPublic } from "../axiosConfig";
export const getAreas = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosPublic({
                method: "get",
                url: "/api/v1/area",
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

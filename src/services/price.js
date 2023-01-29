import { axiosPublic } from "../axiosConfig";
export const getPrices = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosPublic({
                method: "get",
                url: "/api/v1/price",
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

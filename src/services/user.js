import axiosConfig from "../axiosConfig";

export const getCurrentUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/user/get_current_user",
            });
            // console.log();
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};
export const apiUpdateUser = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/user/update_user",
                data: payload,
            });
            // console.log();
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

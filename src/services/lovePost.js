import axiosConfig from "../axiosConfig";

export const apiGetLovePost = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "GET",
                url: "/api/v1/love_post",
            });
            resolve(res.data);
        } catch (error) {
            // console.log(error);
            reject(error);
        }
    });
};
export const apiDeleteLovePost = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "post",
                url: "/api/v1/love_post/delete",
                data: payload,
            });
            resolve(res.data);
        } catch (error) {
            // console.log(error);
            reject(error);
        }
    });
};
export const apiCreateLovePost = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "post",
                url: "/api/v1/love_post/create",
                data: payload,
            });
            resolve(res.data);
        } catch (error) {
            // console.log(error);
            reject(error);
        }
    });
};

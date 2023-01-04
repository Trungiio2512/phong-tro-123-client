import axiosConfig from "../axiosConfig";

export const apiGetPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/post/all",
                // data: payload,
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const apiGetPostsLitmit = (payload = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/post/limit",
                // data: payload,
                params: payload,
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const apiGetNewPosts = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/post/new_post",
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

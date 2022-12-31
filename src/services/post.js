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

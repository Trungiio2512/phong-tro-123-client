import axiosConfig from "../axiosConfig";
import axios from "axios";
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

export const apiCreateNewPost = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "post",
                url: "/api/v1/post/create_post",
                data: payload,
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const apiUploadImages = (images) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axios({
                method: "post",
                url: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                data: images,
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const apiGetPostsPrivate = (payload = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "get",
                url: "/api/v1/post/limit_private",
                // data: payload,
                params: payload,
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

export const apiUpdatePostPrivate = (payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosConfig({
                method: "put",
                url: "/api/v1/post/update_private",
                data: payload,
            });

            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

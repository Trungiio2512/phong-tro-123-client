import axiosConfig from "../axiosConfig";
import axios from "axios";
import { axiosPublic } from "../axiosConfig";

//public
export const apiGetPost = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosPublic({
        method: "get",
        url: "/api/v1/post",
        params: { id: id },
      });
      // console.log(res.data);
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const apiGetPostsLitmit = (payload = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosPublic({
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

export const apiGetNewPosts = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosPublic({
        method: "get",
        url: "/api/v1/post/new_post",
        params: payload,
      });

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

//Private Methods
export const apiCreateNewPost = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "post",
        url: "/api/v1/post/create",
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

export const apiGetPostsPrivate = (payload) => {
  return new Promise(async (resolve, reject) => {
    // console.log(payload);
    try {
      const res = await axiosConfig({
        method: "get",
        url: "/api/v1/post/posts_private",
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
        url: "/api/v1/post/update",
        data: payload,
      });

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const apiDeletePostPrivate = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "delete",
        url: "/api/v1/post/delete",
        data: payload,
      });

      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

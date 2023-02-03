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
        method: "put",
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
export const apiGetLovePosts = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "get",
        url: "/api/v1/user/love_posts",
        params: payload,
      });
      // console.log();
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};
export const apiGetRegisterPosts = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "get",
        url: "/api/v1/user/register_posts",
        params: payload,
      });
      // console.log();
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};
export const apiGetUsersRegisterPosts = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "get",
        url: "/api/v1/user/users_register_post",
        params: payload,
      });
      // console.log();
      resolve(res.data);
    } catch (error) {
      reject(error);
    }
  });
};

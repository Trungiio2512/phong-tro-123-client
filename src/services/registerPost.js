import axiosConfig from "../axiosConfig";

export const apiGetRegistersPosts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "get",
        url: "/api/v1/register_post",
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const apiDeleteRegisterPost = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "post",
        url: "/api/v1/register_post/delete",
        data: payload,
      });
      resolve(res.data);
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
};
export const apiAddRegisterPost = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "post",
        url: "/api/v1/register_post/add",
        data: payload,
      });
      resolve(res.data);
    } catch (error) {
      // console.log(error);
      reject(error);
    }
  });
};

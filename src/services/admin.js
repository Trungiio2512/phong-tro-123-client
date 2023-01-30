import axiosConfig from "../axiosConfig";

export const apiStatistic = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axiosConfig({
        method: "get",
        url: "api/v1/admin/",
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const apiGetUsers = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(payload);
      const res = await axiosConfig({
        method: "get",
        url: "api/v1/admin/users",
        params: payload,
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};
export const apiDeleteUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(payload);
      const res = await axiosConfig({
        method: "post",
        url: "api/v1/admin/delete_user",
        data: payload,
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

export const apiChangeRoleUser = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(payload);
      const res = await axiosConfig({
        method: "post",
        url: "api/v1/admin/change_role",
        data: payload,
      });
      resolve(res.data);
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

import axiosDefault from "axios";
export const getPublicProvinces = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosDefault({
                method: "get",
                url: "https://vapi.vnappmob.com/api/province/",
            });
            // console.log(res);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};
export const getPublicDistricts = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/district/${id}`,
            });
            // console.log(res);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};
export const getPublicWards = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await axiosDefault({
                method: "get",
                url: `https://vapi.vnappmob.com/api/province/ward/${id}`,
            });
            // console.log(res);
            resolve(res.data);
        } catch (error) {
            reject(error);
        }
    });
};

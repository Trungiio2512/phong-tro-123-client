import * as Yup from "yup";

const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
export const name = Yup.string()
    .min(2, "Quá ngắn")
    .max(50, "Qua dài")
    .required("Không được để trống trường này");
export const phone = Yup.string()
    .required("Không được để trống trường này")
    .matches(phoneRegExp, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại không hợp lệ")
    .max(10, "Số điện thoại không hợp lệ");
export const password = Yup.string()
    .required("Không được để trống trường này")
    .min(5, "Tối thiểu 5 kí tự");
export const textContent = Yup.string().required("Không được để trống trường này");

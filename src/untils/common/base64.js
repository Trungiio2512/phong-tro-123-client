import { Buffer } from "buffer";

const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

const base64Tofile = (bolb) => bolb && new Buffer(bolb, "base64").toString("binary");
export { fileToBase64, base64Tofile };

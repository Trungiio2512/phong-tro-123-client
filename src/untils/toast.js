import { toast } from "react-toastify";

const styles = {
    position: "bottom-left",
    autoClose: 1200,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
};

export const toastSuccess = (mess) => {
    toast.success(mess, styles);
};

export const toastError = (mess) => {
    toast.error(mess, styles);
};

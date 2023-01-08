import icons from "./icons";
const { BsFillPencilFill, FaClipboardList, RiFolderUserLine } = icons;
const menuManager = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: "/system/create-new",
        icon: <BsFillPencilFill />,
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: "/system/manager-post",
        icon: <FaClipboardList />,
    },
    {
        id: 3,
        text: "Thông tin tài khoản",
        path: "/system/profile",
        icon: <RiFolderUserLine />,
    },
];

export default menuManager;

import icons from "./icons";
const { BsFillPencilFill, FaClipboardList, RiFolderUserLine, BsChatText } = icons;
export const menuHomeManager = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: "/he-thong/tao-moi-bai-dang",
        icon: <BsFillPencilFill />,
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: "/he-thong/quan-ly-bai-dang",
        icon: <FaClipboardList />,
    },
    {
        id: 3,
        text: "Thông tin tài khoản",
        path: "/he-thong/thong-tin-tai-khoan",
        icon: <RiFolderUserLine />,
    },
];

export const menuSidebarManager = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: "/he-thong/tao-moi-bai-dang",
        icon: <BsFillPencilFill />,
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: "/he-thong/quan-ly-bai-dang",
        icon: <FaClipboardList />,
    },
    {
        id: 3,
        text: "Sửa thông tin cá nhân",
        path: "/he-thong/sua-thong-tin-ca-nhan",
        icon: <RiFolderUserLine />,
    },
    // {
    //     id: 4,
    //     text: "Sửa thông tin cá nhân",
    //     path: "/he-thong/sua-thong-tin-ca-nhan",
    //     icon: <RiFolderUserLine />,
    // },
    {
        id: 4,
        text: "Liên hệ",
        path: "/he-thong/lien-he",
        icon: <BsChatText />,
    },
];

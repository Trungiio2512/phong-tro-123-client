import icons from "./icons";
const { BsFillPencilFill, FaClipboardList, RiFolderUserLine, BsChatText, BsHeartFill } = icons;
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
        path: "/he-thong/thong-tin-ca-nhan",
        icon: <RiFolderUserLine />,
    },
    {
        id: 5,
        text: "Yêu thích",
        path: "/he-thong/yeu-thich",
        icon: <BsHeartFill />,
    },
    {
        id: 4,
        text: "Liên hệ",
        path: "/lien-he",
        icon: <BsChatText />,
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
        path: "/he-thong/thong-tin-ca-nhan",
        icon: <RiFolderUserLine />,
    },
    {
        id: 5,
        text: "Yêu thích",
        path: "/he-thong/yeu-thich",
        icon: <BsHeartFill />,
    },
    {
        id: 4,
        text: "Liên hệ",
        path: "/lien-he",
        icon: <BsChatText />,
    },
];

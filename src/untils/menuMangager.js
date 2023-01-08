import icons from "./icons";
const { BsFillPencilFill, FaClipboardList, RiFolderUserLine } = icons;
const menuManager = [
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

export default menuManager;

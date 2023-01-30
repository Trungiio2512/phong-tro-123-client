import icons from "./icons";
const {
    BsFillPencilFill,
    FaClipboardList,
    RiFolderUserLine,
    BsChatText,
    BsHeartFill,
    MdSupervisorAccount,
    GiNewspaper,
    FcStatistics,
    FiHome,
} = icons;
export const menuCreator = [
    {
        id: 1,
        text: "Đăng tin cho thuê",
        path: "/he-thong/tao-moi-bai-dang",
        icon: <BsFillPencilFill size={20} />,
    },
    {
        id: 2,
        text: "Quản lý tin đăng",
        path: "/he-thong/quan-ly-bai-dang",
        icon: <FaClipboardList size={20} />,
    },
    {
        id: 3,
        text: "Thông tin tài khoản",
        path: "/he-thong/thong-tin-ca-nhan",
        icon: <RiFolderUserLine size={20} />,
    },
    {
        id: 5,
        text: "Yêu thích",
        path: "/he-thong/yeu-thich",
        icon: <BsHeartFill size={20} />,
    },
    {
        id: 4,
        text: "Liên hệ",
        path: "/lien-he",
        icon: <BsChatText size={20} />,
    },
];

export const menuUser = [
    {
        id: 3,
        text: "Thông tin tài khoản",
        path: "/he-thong/thong-tin-ca-nhan",
        icon: <RiFolderUserLine size={20} />,
    },
    {
        id: 5,
        text: "Yêu thích",
        path: "/he-thong/yeu-thich",
        icon: <BsHeartFill size={20} />,
    },
    {
        id: 4,
        text: "Liên hệ",
        path: "/lien-he",
        icon: <BsChatText size={20} />,
    },
];

export const menuAdmin = [
    {
        id: 5,
        text: "Trang chủ",
        path: "/",
        icon: <FiHome size={30} />,
    },
    {
        id: 1,
        text: "Thống kê",
        path: "/admin/thong-ke",
        icon: <FcStatistics size={30} />,
    },

    {
        id: 2,
        text: "Quản lý tài khoản",
        path: "/admin/tai-khoan",
        icon: <MdSupervisorAccount size={30} />,
    },
    {
        id: 3,
        text: "Tin đăng",
        path: "/admin/tin-dang",
        icon: <GiNewspaper size={30} />,
    },
    {
        id: 4,
        text: "Loại danh sách tin đăng",
        path: "/admin/loai-danh-sach-tin-dang",
        icon: <RiFolderUserLine size={30} />,
    },
    {
        id: 5,
        text: "Tin tức",
        path: "/admin/tin-tuc",
        icon: <GiNewspaper size={30} />,
    },
];

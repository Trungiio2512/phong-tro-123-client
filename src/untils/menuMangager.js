import icons from "./icons";
import { path } from "./constant";
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
  RiRegisteredFill,
  BiUserPin,
  // RiFileUserLine,
  // RiFolderUserLine
} = icons;

export const menuCreator = [
  // { id: 1, text: "Trang chủ", path: "/", icon: <FiHome size={20} /> },
  {
    id: 2,
    text: "Đăng tin cho thuê",
    path: "/he-thong/tao-moi-bai-dang",
    icon: <BsFillPencilFill size={20} />,
  },
  {
    id: 3,
    text: "Quản lý tin đăng",
    path: "/he-thong/quan-ly-bai-dang",
    icon: <FaClipboardList size={20} />,
  },
  {
    id: 4,
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
    id: 6,
    text: "Tin đã đăng ký",
    path: "/he-thong/dang-ky-bai-dang",
    icon: <RiRegisteredFill size={20} />,
  },
  {
    id: 7,
    text: "Những người đã đăng ký",
    path: "/he-thong/nguoi-dang-ky-bai-dang",
    icon: <BiUserPin size={20} />,
  },
  {
    id: 8,
    text: "Liên hệ",
    path: "/lien-he",
    icon: <BsChatText size={20} />,
  },
];

export const menuUser = [
  // { id: 1, text: "Trang chủ", path: "/", icon: <FiHome size={20} /> },
  {
    id: 2,
    text: "Thông tin tài khoản",
    path: "/he-thong/thong-tin-ca-nhan",
    icon: <RiFolderUserLine size={20} />,
  },
  {
    id: 3,
    text: "Yêu thích",
    path: "/he-thong/yeu-thich",
    icon: <BsHeartFill size={20} />,
  },
  {
    id: 5,
    text: "Tin đã đăng ký",
    path: "/he-thong/dang-ky-bai-dang",
    icon: <RiRegisteredFill size={20} />,
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
    icon: <FiHome size={20} />,
  },
  {
    id: 1,
    text: "Thống kê",
    path: "/admin/thong-ke",
    icon: <FcStatistics size={20} />,
  },

  {
    id: 2,
    text: "Quản lý tài khoản",
    path: "/admin/tai-khoan",
    icon: <MdSupervisorAccount size={20} />,
  },
  {
    id: 3,
    text: "Quản lý bài đăng",
    path: "/admin/quan-ly-bai-dang",
    icon: <GiNewspaper size={20} />,
  },
  {
    id: 4,
    text: "Loại danh sách bài  đăng",
    path: "/admin/quan-ly-loai-dach-sach",
    icon: <RiFolderUserLine size={20} />,
  },
  {
    id: 5,
    text: "Tin tức",
    path: "/admin/tin-tuc",
    icon: <GiNewspaper size={20} />,
  },
];

import jwt from "jwt-decode";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memo, useEffect, useRef, useState } from "react";
import { Button } from "antd";
import Tippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";

import icons from "../../../untils/icons";
import { User } from "../../../components";
import { path } from "../../../untils/constant";
import * as actions from "../../../store/actions/auth";
import { menuCreator, menuUser } from "../../../untils/menuMangager";
import Swal from "sweetalert2";
import logo_nobg from "../../../assests/logo_nobg.png";
import { formatVietnameseToString } from "../../../untils/common/fn";

const {
  AiOutlinePlusCircle,
  AiOutlineLogout,
  BsFillCaretDownFill,
  GrUserAdmin,
  AiOutlineUnorderedList,
  FaTimesCircle,
} = icons;

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const headerRef = useRef();

  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.app);

  const [menu, setmenu] = useState(() => {
    return token ? (jwt(token)?.roleCode !== "R3" ? menuCreator : menuUser) : [];
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const [visible, setvisible] = useState(false);
  const [showmenu, setshowmenu] = useState(false);

  return (
    <header className="w-full flex items-center justify-between py-2 relative" ref={headerRef}>
      <Link to={path.HOME}>
        <figure className="w-[240px] h-[50px] shrink-0">
          <img src={logo_nobg} alt="logo" className="w-full h-full object-contain " />
        </figure>
      </Link>
      <div className="items-center gap-2 flex justify-end ">
        {!token && (
          <>
            <small className="text-lg hidden md:inline-block">Phòng trọ 123 xin chào</small>

            <Button
              onClick={() => navigate(`/${path.LOGIN}`)}
              // danger
              type="primary"
              ghost
              className="hidden md:flex md:items-center gap-2 text-sm font-medium"
            >
              Đăng nhập
            </Button>
            <Button
              onClick={() => navigate(`/${path.REGISTER}`)}
              // danger
              type="primary"
              ghost
              className="hidden md:flex md:items-center gap-2 text-md text-black font-medium"
            >
              Đăng ký
            </Button>
          </>
        )}
        {token && (
          <>
            <User />
            {token &&
              (jwt(token)?.roleCode === "R1" ? (
                <Button
                  icon={<GrUserAdmin />}
                  type="default"
                  // ghost
                  onClick={() => navigate(`/${path.ADMIN}`)}
                  className="hidden md:flex md:items-center gap-2 text-sm font-medium"
                >
                  Admin
                </Button>
              ) : null)}
            <div>
              <Tippy
                visible={visible}
                delay={500}
                interactive
                placement="bottom-end"
                render={(attrs) => (
                  <div
                    className="md:w-[250px] min-w-full p-2 rounded-md shadow-dm border bg-white border-gray-200"
                    tabIndex="-1"
                    {...attrs}
                  >
                    {menu.length > 0 &&
                      menu.map((item) => {
                        return (
                          <Button
                            className="flex items-center gap-2 text-md text-black font-medium "
                            key={item?.id}
                            // to={item?.path}
                            type="link"
                            onClick={() => {
                              navigate(item?.path);
                            }}
                          >
                            {/* {Link(item.path)} */}
                            <span>{item.icon}</span>
                            <span> {item.text}</span>
                          </Button>
                        );
                      })}
                    <Button
                      type="link"
                      onClick={() => {
                        // navigate(path.LOGIN);
                        Swal.fire("Đăng xuất", "Thành công", "success").then(() => {
                          dispatch(actions.logout());
                          navigate(`/${path.LOGIN}`);
                        });
                      }}
                      className="flex items-center gap-2 text-black font-medium text-md"
                    >
                      <span>
                        <AiOutlineLogout size={20} />
                      </span>
                      Đăng xuất
                    </Button>
                  </div>
                )}
              >
                <Button
                  onClick={() => setvisible(!visible)}
                  icon={<BsFillCaretDownFill />}
                  className="hidden md:flex md:items-center gap-2 text-sm font-medium"
                >
                  Quản lý tài khoản
                </Button>
              </Tippy>
            </div>
          </>
        )}
        {token && jwt(token)?.roleCode !== "R3" && (
          <Button
            onClick={() => (token ? navigate("/he-thong/tao-moi-bai-dang") : navigate(path.LOGIN))}
            icon={<AiOutlinePlusCircle />}
            danger
            type="primary"
            className="hidden lg:flex lg:items-center gap-2 text-sm font-medium"
          >
            Đăng tin mới
          </Button>
        )}
      </div>
      <Button type="default text-2xl" className="md:hidden" onClick={() => setshowmenu(!showmenu)}>
        {!showmenu ? <AiOutlineUnorderedList /> : <FaTimesCircle />}
      </Button>
      <ul
        className={`md:hidden py-4 shadow-md absolute  bg-blue-100 left-0 w-full transition-all duration-500 ease-in ${
          showmenu ? "top-20 z-10" : "top-[-490px] z-[-1]"
        }`}
        onClick={(e) => console.log(e.target.value)}
      >
        <li>
          <Link to={`/`}>Trang chủ</Link>
        </li>
        {categories.map((item) => {
          return (
            <li key={item.code}>
              <Link to={`/${formatVietnameseToString(item?.value)}`}>{item.value}</Link>
            </li>
          );
        })}
        {!token && (
          <>
            <li>
              <Link to={`${path.LOGIN}`}>Đăng nhập</Link>
            </li>
            <li>
              <Link to={`${path.REGISTER}`}>Đăng Ký</Link>
            </li>
          </>
        )}
        {token && jwt(token)?.roleCode === "R1" && (
          <li>
            <Link to={`/${path.ADMIN}`}>Admin</Link>
          </li>
        )}
        {token && jwt(token)?.roleCode !== "R3" && (
          <li>
            <Link to={`/he-thong/tao-moi-bai-dang`}>Đăng tin mới</Link>
          </li>
        )}

        {menu.length > 0 &&
          menu.map((item) => {
            return (
              <li
                key={item?.id}
                // onClick={() => {
                //   navigate(item?.path);
                // }}
              >
                {/* {Link(item.path)} */}
                <Link to={item.path}>{item.text}</Link>
              </li>
            );
          })}
      </ul>
    </header>
  );
}

export default memo(Header);

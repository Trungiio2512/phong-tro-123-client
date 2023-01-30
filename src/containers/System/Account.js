import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Pagination } from "antd";

import { SkeletonCutom, User } from "../../components";
import { apiGetUsers } from "../../services/admin";
import icons from "../../untils/icons";
import { createSearchParams, useLocation, useNavigate, useSearchParams } from "react-router-dom";
const { Search } = Input;
const { MdOutlineDelete, BsFillPencilFill } = icons;

const countLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const Account = (props) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    console.log(location.pathname);

    const [loading, setloading] = useState(true);
    const [users, setusers] = useState([]);
    const [page, setPage] = useState(1);
    const [countUser, setcountUser] = useState(0);

    useEffect(() => {
        setloading(true);
        const timerLoading = setTimeout(async () => {
            const res = await apiGetUsers({ page });
            if (res.err === 0) {
                setloading(false);
                setusers(res.data?.rows);
                setcountUser(res.data?.count);
            }
        }, 2000);

        return () => {
            clearTimeout(timerLoading);
        };
    }, [page]);

    const handleChangePage = (page) => {
        setPage(page);
        searchParams.set("page", page);
        navigate({
            pathname: location.pathname,
            search: `?${createSearchParams(searchParams)}`,
        });
    };

    return (
        <div className="w-full h-full">
            <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-xl">Danh sách tài khoản</h2>
                {/* <Search placeholder="input search text" enterButton="Search" size="large" /> */}
            </div>
            <div className="p-0 rounded-lg shadow hidden lg:block">
                <table className=" w-full ">
                    <thead className="bg-gray-100 border-b-2 broder-gray-300">
                        <tr className=" ">
                            <th className="p-3 text-sm font-semibolb tracking-wide text-left">#</th>
                            <th className="p-3 text-sm font-semibolb tracking-wide text-left">
                                Tên người dùng
                            </th>
                            <th className="p-3 text-sm font-semibolb tracking-wide text-left">
                                Loại tài khoản
                            </th>
                            <th className="p-3 text-sm font-semibolb tracking-wide text-left">
                                Tuỳ chọn
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-300">
                        {!loading
                            ? users.length > 0 &&
                              users.map((user) => {
                                  return (
                                      <tr key={user?.id}>
                                          <td className="whitespace-nowrap text-sm p-3 text-gray-700">
                                              {user.id}
                                          </td>
                                          <td className="whitespace-nowrap text-sm p-3 text-gray-700">
                                              {user.name}
                                          </td>
                                          <td
                                              className={`whitespace-nowrap text-sm p-3 text-gray-700 rounded-md flex justify-start`}
                                          >
                                              <span
                                                  className={`p-1.5 text-xs font-medium uppercase tracking-wide ${
                                                      user.userRole.code === "R1"
                                                          ? "text-red-800 bg-red-100"
                                                          : user.userRole.code === "R2"
                                                          ? "text-yellow-800 bg-yellow-100"
                                                          : "text-green-800 bg-green-100"
                                                  } `}
                                              >
                                                  {user.userRole.value}
                                              </span>
                                          </td>
                                          <td>
                                              {" "}
                                              <div className="flex items-center gap-2">
                                                  <Button
                                                      className="font-medium bg-green-100 text-green-800 flex items-center gap-2"
                                                      icon={<BsFillPencilFill />}
                                                  >
                                                      Chức năng
                                                  </Button>{" "}
                                                  <Button
                                                      className="font-medium bg-red-100 text-red-800 flex items-center gap-2"
                                                      icon={<MdOutlineDelete size={18} />}
                                                  >
                                                      Xoá
                                                  </Button>
                                              </div>
                                          </td>
                                      </tr>
                                  );
                              })
                            : countLoading.map((item) => {
                                  return (
                                      <tr key={item}>
                                          <td className="p-3">
                                              <SkeletonCutom />
                                          </td>
                                          <td className="p-3">
                                              <SkeletonCutom />
                                          </td>
                                          <td className="p-3">
                                              <SkeletonCutom className={"max-w-[100px]"} />
                                          </td>
                                          <td className="p-3">
                                              <SkeletonCutom />
                                          </td>
                                      </tr>
                                  );
                              })}
                    </tbody>
                </table>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
                {!loading
                    ? users.length > 0 &&
                      users.map((user) => {
                          return (
                              <div key={user.id} className="bg-gray-100 p-4 rounded-md shadow">
                                  <div className="flex flex-col gap-4 ">
                                      <span className="text-sm ">Id: {user.id}</span>
                                      <span className="text-sm ">Tên người dùng : {user.name}</span>
                                      <span
                                          className={`p-1.5 text-xs font-medium uppercase tracking-wide ${
                                              user.userRole.code === "R1"
                                                  ? "text-red-800 bg-red-100"
                                                  : user.userRole.code === "R2"
                                                  ? "text-yellow-800 bg-yellow-100"
                                                  : "text-green-800 bg-green-100"
                                          } `}
                                      >
                                          {user.userRole.value}
                                      </span>
                                      <div className="flex items-center gap-2">
                                          <Button
                                              className="font-medium bg-green-100 text-green-800 flex items-center gap-2 flex-1"
                                              icon={<BsFillPencilFill />}
                                          >
                                              Chức năng
                                          </Button>{" "}
                                          <Button
                                              className="font-medium bg-red-100 text-red-800 flex items-center gap-2 flex-1"
                                              icon={<MdOutlineDelete size={18} />}
                                          >
                                              Xoá
                                          </Button>
                                      </div>
                                  </div>
                              </div>
                          );
                      })
                    : countLoading.map((item) => {
                          return (
                              <div key={item} className="bg-gray-100 p-4 rounded-md shadow">
                                  <div className="flex flex-col gap-4 ">
                                      <SkeletonCutom className={"min-w-200"} />
                                      <SkeletonCutom className={"min-w-200"} />
                                      <SkeletonCutom className={"min-w-200"} />
                                      <div className="flex items-center gap-2">
                                          <SkeletonCutom className={"min-w-100"} />
                                          <SkeletonCutom className={"min-w-100"} />
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
            </div>
            <Pagination
                defaultCurrent={page}
                total={countUser}
                className="mt-4"
                onChange={(page) => handleChangePage(page)}
            />
        </div>
    );
};

Account.propTypes = {};

export default Account;

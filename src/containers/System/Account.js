import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Checkbox, Input, Pagination, Modal, Radio } from "antd";
import { useSearchParams } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

import { SkeletonCutom, User } from "../../components";
import { apiChangeRoleUser, apiDeleteUser, apiGetUsers } from "../../services/admin";
import icons from "../../untils/icons";
import { useDebounce } from "../../hooks";
import { toastError, toastSuccess, toastWarn } from "../../untils/toast";
import { useSelector } from "react-redux";

const { Search } = Input;
const { MdOutlineDelete, BsFillPencilFill } = icons;

const countLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

const Account = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentData } = useSelector((state) => state.user);

  const [loading, setloading] = useState(true);
  const [users, setusers] = useState([]);
  const [countUser, setcountUser] = useState(0);
  const [page, setPage] = useState(1);
  const [searchValue, setsearchValue] = useState("");
  const [refreshPage, setrefreshPage] = useState(false);
  const [openModal, setopenModal] = useState(false);
  const [userRole, setuserRole] = useState({ id: "", roleCode: "" });

  useEffect(() => {
    setloading(true);
    const timerLoading = setTimeout(async () => {
      const res = await apiGetUsers({ page: page, name: searchValue });
      if (res.err === 0) {
        setloading(false);
        setusers(res.data?.rows);
        setcountUser(res.data?.count);
      }
    }, 2000);

    return () => {
      clearTimeout(timerLoading);
    };
  }, [page, searchValue, refreshPage]);

  const handleChangePage = (page) => {
    setPage(page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };

  const handleSearchValue = (value) => {
    searchParams.delete("page");
    // searchParams.set("page", 1);
    if (value) {
      searchParams.set("name", value);
    } else {
      searchParams.delete("name");
    }
    setsearchValue(value);
    setSearchParams(searchParams);
  };

  const handleDeleteUser = async (id, role) => {
    if (currentData.id === id || role === "R1") {
      toastWarn("Bạn không thể tác động lên tài khoản Admin");
      return;
    } else {
      const res = await apiDeleteUser({ id });
      if (res.err === 0) {
        toastSuccess("Xoá người dùng thành công");
        setrefreshPage(!refreshPage);
      } else {
        toastError("Xoá người dùng thất bại");
      }
    }
  };

  const handleChangeRole = async () => {
    // console.log(userRole);
    if (currentData.id === userRole.id || userRole.roleCode === "R1") {
      toastWarn("Bạn không thể tác động lên tài khoản Admin");
      setopenModal(false);
      return;
    } else {
      const res = await apiChangeRoleUser(userRole);
      if (res.err === 0) {
        toastSuccess(res.msg);
        setopenModal(false);
        setrefreshPage(!refreshPage);
      } else {
        toastError(res.msg);
      }
    }
  };

  return (
    <>
      <Modal
        title="Basic Modal"
        open={openModal}
        onCancel={() => setopenModal(false)}
        okType={"danger"}
        onOk={handleChangeRole}
      >
        <Radio.Group
          onChange={(e) =>
            setuserRole((prev) => ({
              ...prev,
              roleCode: e.target.value,
            }))
          }
          value={userRole.roleCode}
        >
          <Radio className="mb-2" value={"R1"}>
            Admin
          </Radio>
          <br />
          <Radio value={"R2"}>Nhà đăng tuyển</Radio>
          <Radio value={"R3"}>Người dùng</Radio>
        </Radio.Group>
      </Modal>
      <div className="w-full h-full">
        <div className="flex md:flex-row md:items-center md:justify-between mb-4 flex-col gap-3">
          <h2 className="font-semibold text-xl">Danh sách tài khoản</h2>
          <Search
            placeholder="Tìm kiếm theo tên"
            enterButton="Search"
            size="middle"
            allowClear
            // value={searchValue}
            // onChange={(e) => setsearchValue(e.target.value)}
            onSearch={handleSearchValue}
            className={`md:w-[400px] sm:w-full `}
          />
        </div>
        <div className="p-0 rounded-lg shadow hidden lg:block">
          <table className=" w-full ">
            <thead className="bg-gray-100 border-b-2 broder-gray-300">
              <tr className=" ">
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">Id người dùng</th>
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">
                  Tên người dùng
                </th>
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">
                  Loại tài khoản
                </th>
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">Tuỳ chọn</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {!loading ? (
                users.length > 0 ? (
                  users.map((user) => {
                    return (
                      <tr key={user?.id}>
                        <td className="whitespace-nowrap text-sm p-3 text-gray-700">{user.id}</td>
                        <td className="whitespace-nowrap text-sm p-3 text-gray-700 ">
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
                          <div className="flex items-center gap-2">
                            <Button
                              className="font-medium bg-green-100 text-green-800 flex items-center gap-2"
                              icon={<BsFillPencilFill />}
                              onClick={() => {
                                setuserRole((prev) => ({
                                  ...prev,
                                  id: user?.id,
                                  roleCode: user.userRole.code,
                                }));
                                setopenModal(true);
                              }}
                            >
                              Chức năng
                            </Button>
                            <Popconfirm
                              title="Xoá người dùng"
                              description="Bạn có muốn xoá người dùng này không?"
                              okButtonProps
                              okType={"danger"}
                              icon={
                                <QuestionCircleOutlined
                                  style={{
                                    color: "red",
                                  }}
                                />
                              }
                              onConfirm={() => handleDeleteUser(user?.id, user.userRole.code)}
                            >
                              <Button
                                className="font-medium bg-red-100 text-red-800 flex items-center gap-2"
                                icon={<MdOutlineDelete size={18} />}
                              >
                                Xoá
                              </Button>
                            </Popconfirm>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div>Không có người dùng nào</div>
                )
              ) : (
                countLoading.map((item) => {
                  return (
                    <tr key={item}>
                      <td className="p-3">
                        <SkeletonCutom className={"min-w-[400px]"} />
                      </td>
                      <td className="p-3">
                        <SkeletonCutom className={"max-w-[100px]"} />
                      </td>
                      <td className="p-3">
                        <SkeletonCutom />
                      </td>
                      <td className="p-3">
                        <SkeletonCutom />
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:hidden">
          {!loading ? (
            users.length > 0 ? (
              users.map((user) => {
                return (
                  <div key={user.id} className="bg-gray-100 p-4 rounded-md shadow">
                    <div className="flex flex-col gap-4 ">
                      <span className="text-sm ">Id: {user.id}</span>
                      <span className="text-sm line-clamp-1">Tên người dùng : {user.name}</span>
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
                      <div className="flex lg:flex-row lg:items-center gap-2 flex-col">
                        <Button
                          className="font-medium bg-green-100 text-green-800 flex items-center gap-2 flex-1"
                          icon={<BsFillPencilFill />}
                          onClick={() => {
                            setuserRole((prev) => ({
                              ...prev,
                              id: user?.id,
                              roleCode: user.userRole.code,
                            }));
                            setopenModal(true);
                          }}
                        >
                          Chức năng
                        </Button>{" "}
                        <Popconfirm
                          title="Xoá người dùng"
                          description="Bạn có muốn xoá người dùng này không?"
                          okButtonProps
                          okType={"danger"}
                          icon={
                            <QuestionCircleOutlined
                              style={{
                                color: "red",
                              }}
                            />
                          }
                          onConfirm={() => handleDeleteUser(user?.id, user.userRole.code)}
                        >
                          <Button
                            className="font-medium bg-red-100 text-red-800 flex items-center gap-2 flex-1"
                            icon={<MdOutlineDelete size={18} />}
                          >
                            Xoá
                          </Button>
                        </Popconfirm>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>Không có người dùng nào</div>
            )
          ) : (
            countLoading.map((item) => {
              return (
                <div key={item} className="bg-gray-100 p-4 rounded-md shadow">
                  <div className="flex flex-col gap-4 ">
                    <SkeletonCutom className={"min-w-200"} />
                    <SkeletonCutom className={"min-w-200"} />
                    <SkeletonCutom className={"min-w-200"} />
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                      <SkeletonCutom className={"min-w-200"} />
                      <SkeletonCutom className={"min-w-200"} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {!loading && users.length > 0 && (
          <Pagination
            defaultCurrent={page}
            total={countUser}
            className="mt-4"
            onChange={(page) => handleChangePage(page)}
          />
        )}
      </div>
    </>
  );
};

Account.propTypes = {};

export default Account;

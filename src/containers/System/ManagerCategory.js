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
import * as adminServices from "../../services/admin";

const { Search } = Input;
const { MdOutlineDelete, BsFillPencilFill } = icons;

const countLoading = [1, 2, 3, 4, 5];
const ManagerCategory = (props) => {
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [countCategories, setcountCategories] = useState(0);
  useEffect(() => {
    setLoading(true);
    const timerLoading = setTimeout(async () => {
      const res = await adminServices.apiGetCategories({ page });
      console.log(res);
      if (res.err === 0) {
        setLoading(false);
        setCategories(res?.data?.rows);
        setcountCategories(res?.data?.count);
      } else {
        toastError(res.msg);
      }
    }, 2000);

    return () => {
      clearTimeout(timerLoading);
    };
  }, [page]);

  return (
    <>
      {/* <Modal
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
        </Modal> */}
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
            // onSearch={handleSearchValue}
            className={`md:w-[400px] sm:w-full `}
          />
        </div>
        <div className="p-0 rounded-lg shadow hidden lg:block overflow-x-scroll">
          <table className=" w-full ">
            <thead className="bg-gray-100 border-b-2 broder-gray-300">
              <tr className=" ">
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">Tên loại</th>
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">Mô tả cơ bản</th>
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">
                  Mô tả chi tiết
                </th>
                <th className="p-3 text-sm font-semibolb tracking-wide text-left">Tuỳ chọn</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-300">
              {!loading ? (
                categories.length > 0 ? (
                  categories.map((category) => {
                    return (
                      <tr key={category?.id}>
                        <td className=" text-sm p-3 text-gray-700">{category?.value}</td>
                        <td className=" text-sm p-3 text-gray-700 ">{category?.header}</td>
                        <td className=" text-sm p-3 text-gray-700 max-w-400 ">
                          <p className="line-clamp-3">{category?.subheader}</p>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2">
                            <Button
                              className="font-medium bg-green-100 text-green-800 flex items-center gap-2"
                              icon={<BsFillPencilFill />}
                            >
                              Sửa
                            </Button>
                            <Popconfirm
                              title="Xoá loại bài đăng"
                              description="Bạn có muốn xoá loại bài đăng này không?"
                              okButtonProps
                              okType={"danger"}
                              icon={
                                <QuestionCircleOutlined
                                  style={{
                                    color: "red",
                                  }}
                                />
                              }
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
                        <SkeletonCutom containerClassName={"max-w-[100px]"} />
                      </td>
                      <td className="p-3">
                        <SkeletonCutom containerClassName={"max-w-[200px]"} />
                      </td>
                      <td className="p-3">
                        <SkeletonCutom count={3} containerClassName={"max-w-[400px]"} />
                      </td>
                      <td className="p-3 ">
                        <div className="flex items-center gap-2">
                          <SkeletonCutom containerClassName={"flex-1"} className={"p-3"} />
                          <SkeletonCutom containerClassName={"flex-1 "} className={"p-3"} />
                        </div>
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
            categories.length > 0 ? (
              categories.map((category) => {
                return (
                  <div key={category?.id} className="bg-gray-100 p-4 rounded-md shadow">
                    <div className="flex flex-col gap-4 ">
                      <span className="text-md font-semibold text-blue-400">{category?.value}</span>
                      <span className="text-sm line-clamp-2">{category?.header}</span>
                      <span className="text-sm line-clamp-3">{category?.subheader}</span>

                      <div className="flex lg:flex-row lg:items-center gap-2 flex-col">
                        <Button
                          className="font-medium bg-green-100 text-green-800 flex items-center gap-2 flex-1"
                          icon={<BsFillPencilFill />}
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
                          // onConfirm={() => handleDeleteUser(user?.id, user.userRole.code)}
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
                    <SkeletonCutom />
                    <SkeletonCutom count={2} />
                    <SkeletonCutom count={3} />
                    <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                      <SkeletonCutom className={"p-3"} />
                      <SkeletonCutom className={"p-3"} />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {!loading && (
          <Pagination
            hideOnSinglePage
            defaultCurrent={page}
            total={countCategories}
            className="mt-4"
            // onChange={(page) => handleChangePage(page)}
          />
        )}
      </div>
      ;
    </>
  );
};

ManagerCategory.propTypes = {};

export default ManagerCategory;

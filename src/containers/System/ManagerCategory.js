import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Button, Input, Pagination, Modal } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Popconfirm } from "antd";

import { SkeletonCutom } from "../../components";

import icons from "../../untils/icons";
import { toastError, toastSuccess } from "../../untils/toast";
import * as adminServices from "../../services/admin";
import validate from "../../untils/validate";

const { Search, TextArea } = Input;
const { MdOutlineDelete, BsFillPencilFill, AiOutlinePlus } = icons;

const countLoading = [1, 2, 3, 4, 5];
const ManagerCategory = (props) => {
  const [payload, setpayload] = useState({ code: "", value: "", header: "", subheader: "" });
  const [openModal, setopenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [countCategories, setcountCategories] = useState(0);
  const [type, setType] = useState("create");
  const [initialFields, setinitialFields] = useState([]);

  const handleSubmit = async () => {
    const { code, ...passPayload } = payload;
    let count;
    if (type === "create") {
      count = validate(passPayload, setinitialFields);
    } else if (type === "update") {
      count = validate(payload, setinitialFields);
    }
    if (count <= 0) {
      console.log(payload);
      let res;
      if (type === "create") {
        res = await adminServices.apiCreateCategory(payload);
      } else if (type === "update") {
        res = await adminServices.apiUpdateCategory(payload);
      }

      if (res.err === 0) {
        setReload(!reload);
        toastSuccess(res.msg);
      } else {
        toastError(res.msg);
      }
      setopenModal(false);
    }
  };

  const handleDelete = async (code) => {
    const res = await adminServices.apiDeleteCategory({ code });
    if (res.err === 0) {
      toastSuccess(res.msg);
      setReload(!reload);
    } else {
      toastError(res.msg);
    }
  };

  const textError = (name) => {
    return initialFields.find((item) => item.name === name)?.message;
  };

  const textErrorRemove = (name) => {
    const newFields = initialFields.filter((item) => item.name !== name);
    setinitialFields(newFields);
  };

  useEffect(() => {
    setLoading(true);
    const timerLoading = setTimeout(async () => {
      const res = await adminServices.apiGetCategories({ page });
      // console.log(res);
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
  }, [page, reload]);

  useEffect(() => {
    setinitialFields([]);
  }, [openModal]);

  return (
    <>
      <Modal
        title="Basic Modal"
        open={openModal}
        onCancel={() => setopenModal(false)}
        okType={"danger"}
        onOk={handleSubmit}
        // className="flex flex-col gap-2"
      >
        <div className="flex flex-col gap-2">
          <Input
            addonBefore="Loại danh mục"
            type="text"
            placeholder="Loại danh mục"
            value={payload.value}
            onChange={(e) =>
              setpayload((prev) => ({
                ...prev,
                value: e.target.value,
              }))
            }
            id="value"
            onBlur={() => textErrorRemove("value")}
            // status={formik.errors.header && "error"}
          />
          {initialFields.some((item) => item.name === "value") && (
            <span className="text-red-400 text-sm italic">{textError("value")}</span>
          )}
          <Input
            // title="Mô tả cơ bản"
            addonBefore="Mô tả cơ bản"
            type="text"
            placeholder="Mô tả cơ bản"
            value={payload.header}
            onChange={(e) =>
              setpayload((prev) => ({
                ...prev,
                header: e.target.value,
              }))
            }
            onBlur={() => textErrorRemove("header")}
            id="header"
            // status={formik.errors.header && "error"}
          />
          {initialFields.some((item) => item.name === "header") && (
            <span className="text-red-400 text-sm italic">{textError("header")}</span>
          )}
          <TextArea
            placeholder="Mô tả chi tiết"
            value={payload.subheader}
            onChange={(e) =>
              setpayload((prev) => ({
                ...prev,
                subheader: e.target.value,
              }))
            }
            onBlur={() => textErrorRemove("subheader")}
            autoSize={{ minRows: 6 }}
            id="subheader"
          />
          {initialFields.some((item) => item.name === "subheader") && (
            <span className="text-red-400 text-sm italic">{textError("subheader")}</span>
          )}
        </div>
      </Modal>
      <div className="w-full h-full">
        <div className="flex md:flex-row md:items-center md:justify-between mb-2 flex-col gap-3">
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
        <Button
          className="flex items-center gap-2 w-full md:w-auto mb-4"
          danger
          type="primary"
          size="medium"
          icon={<AiOutlinePlus />}
          onClick={() => {
            setopenModal(true);
            setType("create");
            setpayload({ code: "", value: "", header: "", subheader: "" });
          }}
        >
          Thêm mới
        </Button>
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
                              onClick={() => {
                                setopenModal(true);
                                setpayload((prev) => ({
                                  ...prev,
                                  code: category?.code,
                                  value: category?.value,
                                  header: category?.header,
                                  subheader: category?.subheader,
                                }));
                                setType("update");
                              }}
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
                              onConfirm={() => handleDelete(category?.code)}
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
                          Sửa
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
    </>
  );
};

ManagerCategory.propTypes = {};

export default ManagerCategory;

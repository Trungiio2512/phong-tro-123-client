import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Input, Pagination, Popconfirm } from "antd";
import moment from "moment";
import jwt from "jwt-decode";
import Swal from "sweetalert2";

import * as actions from "../../store/actions";
import { Button, SkeletonCutom } from "../../components";
import { apiDeletePostPrivate } from "../../services/post";
import { path } from "../../untils/constant";
import { checkStatus } from "../../untils/common/fn";
import icons from "../../untils/icons";

const countLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const { Search } = Input;
const { AiOutlinePlus } = icons;
const ManagerPost = ({ admin = false }) => {
  // console.log(token);
  const navigate = useNavigate();
  const dispath = useDispatch();
  const location = useLocation();
  const [searchParams, setSeachParams] = useSearchParams();
  // console.log(location);
  const { posts, countPosts } = useSelector((state) => state.user);

  const [refreshPage, setrefreshPage] = useState(false);
  const [loading, setloading] = useState(false);
  const [page, setpage] = useState(1);
  const [searchValue, setsearchValue] = useState("");

  // console.log(role);
  useEffect(() => {
    // const payload = {page}
    if (admin) {
      dispath(actions.getPosts({ page, title: searchValue }));
    } else {
      dispath(actions.getPostsPrivate({ page, title: searchValue }));
    }
  }, [page, refreshPage, searchValue]);

  useEffect(() => {
    setloading(true);
    const timerLoading = setTimeout(() => {
      // posts.length === 0 && setnoPost(true);
      setloading(false);
    }, 2000);
    return () => {
      clearTimeout(timerLoading);
    };
  }, [posts]);

  const handleDeletePost = async (post) => {
    // console.log(post);
    const payload = {
      postId: post.id,
      attributesId: post.attributesId,
      imagesId: post.imagesId,
      overviewId: post.overviewId,
    };
    // console.log(payload);

    const res = await apiDeletePostPrivate(payload);
    // console.log(res);
    if (res.data > 0) {
      Swal.fire("Thành công ", "thanh cong", "success");
      setrefreshPage(!refreshPage);
    } else {
      Swal.fire("Thất bại", "Có lỗi", "error");
    }
  };

  const handleChangePage = (page) => {
    setpage(page);
    searchParams.set("page", page);
    setSeachParams(searchParams);
    // console.log(page);
  };

  const handleSearch = (value) => {
    if (value) {
      searchParams.set("title", value);
    } else {
      searchParams.delete("title");
    }
    setsearchValue(value);
    setSeachParams(searchParams);
  };

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b-1 gap-2 border-gray-300mb-2 pb-4">
        <h2 className="font-semibold text-2xl ">Quản lý tin đăng</h2>
        <Search
          placeholder="Tìm kiếm theo tên bài đăng"
          allowClear
          enterButton="Search"
          size="medium"
          className="lg:w-[400px] w-full"
          onSearch={handleSearch}
        />
        {/* <select onChange={(e) => handleFilterPost(e.target.value)}>
          <option value="">--Lọc theo trạng thái--</option>
          <option value="0">--Đang hoạt động--</option>
          <option value="1">--Hết hạn--</option>
        </select> */}
      </div>
      {admin && (
        <Button
          textColor={"text-white"}
          bgColor="bg-red-400"
          text={"Tạo mới"}
          isAfter
          Icon={AiOutlinePlus}
          className="left-0 m-0 md:w-auto w-full mb-4"
          onClick={() => navigate(`/${path.ADMIN}/${path.CREATE_POST}`)}
        />
      )}

      <div className="hidden relative lg:flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
              <thead className="align-bottom">
                <tr>
                  <th className=" p-3 font-bold text-left capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Mã tin
                  </th>
                  <th className=" p-3 pl-2 font-bold text-left capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Ảnh đại diện
                  </th>
                  <th className=" p-3 font-bold text-center capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Tiêu đề
                  </th>
                  <th className=" p-3 font-bold text-center capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Giá
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Ngày bắt đầu
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Ngày hết hạn
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Trạng thái
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Tuỳ chọn
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading ? (
                  posts?.length > 0 ? (
                    posts.map((post) => {
                      return (
                        <tr key={post?.id}>
                          <td className="p-3 text-center">{post?.overviews?.code}</td>
                          <td className="p-3">
                            <figure className="max-w-[120px] w-full h-full">
                              <img
                                className="w-full h-full object-cover"
                                src={JSON.parse(post?.imagesData.images)[0]}
                                alt=""
                              />
                            </figure>
                          </td>
                          <td className="p-3 ">
                            <span className="text-center line-clamp-2 max-w-[200px] ">
                              {post?.title}
                            </span>
                          </td>
                          <td className="p-3 text-center">{post?.attributesData?.price}</td>
                          <td className="p-3 text-center">{post?.overviews?.created}</td>
                          <td className="p-3 text-center">{post?.overviews?.expired}</td>
                          <td className="p-3 text-center">
                            {checkStatus(post?.overviews?.expired.split(" ")[3])
                              ? "Còn hạn"
                              : "Hết hạn"}
                          </td>
                          <td>
                            <div className="flex items-center gap-2 justify-center">
                              <Button
                                text="Sửa"
                                bgColor={"bg-green-500"}
                                textColor="text-white"
                                onClick={() => {
                                  // setisEdit(true);
                                  navigate(`/${path.SYSTEM}/${path.UPDATE_POST}/${post.id}`, {
                                    state: { isEdit: true },
                                  });

                                  dispath(actions.editPostPrivate(post));
                                }}
                              />
                              <Popconfirm
                                title="Bạn có chắc chắn xoá bài đăng này"
                                okType="danger"
                                placement="topRight"
                                onConfirm={() => handleDeletePost(post)}
                              >
                                <Button
                                  text="Xoá"
                                  bgColor={"bg-red-500"}
                                  textColor="text-white"
                                  // onClick={}
                                />
                              </Popconfirm>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <h2 className="p-3">Không có bài đăng nào</h2>
                      </td>
                    </tr>
                  )
                ) : (
                  countLoading.map((i) => {
                    return (
                      <tr key={i}>
                        <td className="p-3 ">
                          <SkeletonCutom className={"max-w-[80px] "} />
                        </td>
                        <td className="p-3">
                          <figure className="max-w-[120px] w-full h-full">
                            <SkeletonCutom height={"100%"} />
                          </figure>
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom count={2} className={"min-w-200"} />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom />
                        </td>
                        <td className="p-3">
                          <div className="flex items-center gap-2 justify-center">
                            <SkeletonCutom className={"p-2 min-w-[50px]"} />
                            <SkeletonCutom className={"p-2 min-w-[50px]"} />
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className={`lg:hidden grid md:grid-cols-2 gap-3 mb-4`}>
        {loading ? (
          countLoading.map((i) => {
            return (
              <div
                key={i}
                className={`w-full bg-gray-100 shadow-md rounded-md border-b-1 border-gray-300 p-4 flex flex-col gap-4`}
              >
                <SkeletonCutom containerClassName={"max-w-[80px]"} />
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <figure className="w-full h-[400px] md:w-[150px] rounded-md overflow-hidden md:h-[200px]">
                      <SkeletonCutom height={"100%"} />
                    </figure>
                  </div>
                  <div className="flex flex-col gap-2 flex-1 justify-start h-full">
                    <SkeletonCutom containerClassName={"md:max-w-[100px] w-full"} count={3} />
                    <SkeletonCutom containerClassName={"md:max-w-[100px] w-full"} />
                    <div className="flex flex-col gap-3">
                      <SkeletonCutom containerClassName={"flex-1 "} />
                      <SkeletonCutom containerClassName={"flex-1 "} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row ms:items-center gap-2">
                  <SkeletonCutom className={"p-3"} containerClassName={"flex-1 "} />
                  <SkeletonCutom className={"p-3"} containerClassName={"flex-1 "} />
                </div>
              </div>
            );
          })
        ) : posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <div
                key={post?.id}
                className={`w-full bg-gray-100 shadow-md rounded-md border-b-1 border-gray-300 p-4 flex flex-col gap-4`}
              >
                <span className="text-sm font-semibold ">{post?.overviews?.code}</span>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                  <div className="flex flex-col gap-2">
                    <figure className="w-full h-[400px] rounded-md overflow-hidden md:w-[150px]  md:h-[200px]">
                      <img
                        src={JSON.parse(post?.imagesData.images)[0]}
                        alt={post?.title}
                        className={"w-full h-full object-contain"}
                      />
                    </figure>
                  </div>
                  <div className="flex flex-col gap-2 flex-1 justify-start h-full">
                    <h2 className="font-semibold line-clamp-3">{post?.title}</h2>
                    <span className="text-md text-red-300">{post?.attributesData?.price}</span>
                    <div className="flex flex-col gap-3">
                      <span className="text-sm flex-1">{post?.overviews?.created}</span>
                      <span className="text-sm flex-1">{post?.overviews?.expired}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row ms:items-center gap-2">
                  <Button
                    text="Sửa"
                    bgColor={"bg-green-500"}
                    textColor="text-white"
                    fullWidth
                    onClick={() => {
                      // setisEdit(true);
                      navigate(`/${path.SYSTEM}/${path.UPDATE_POST}/${post.id}`, {
                        state: { isEdit: true },
                      });
                      dispath(actions.editPostPrivate(post));
                    }}
                  />
                  <Popconfirm
                    title="Bạn có chắc chắn xoá bài đăng này"
                    okType="danger"
                    onConfirm={() => handleDeletePost(post)}
                  >
                    <Button
                      text="Xoá"
                      bgColor={"bg-red-500"}
                      textColor="text-white"
                      fullWidth
                      // onClick={}
                    />
                  </Popconfirm>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="font-semibold text-xl">Không có bài đăng nào</h2>
        )}
      </div>
      <Pagination
        defaultCurrent={page}
        // hideOnSinglePage
        total={countPosts}
        pageSize={process.env.REACT_APP_LIMIT_POSTS}
        onChange={(page) => handleChangePage(page)}
      />
    </div>
  );
};

ManagerPost.propTypes = {};

export default ManagerPost;

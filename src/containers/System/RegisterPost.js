import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Input, Pagination, Popconfirm, Button } from "antd";

import { ListItem, SkeletonCutom } from "../../components";
import { checkStatus } from "../../untils/common/fn";
import { apiAddRegisterPost, apiDeleteRegisterPost } from "../../services/registerPost";
import * as actions from "../../store/actions";
import * as userServices from "../../services/user";
import { toastError, toastSuccess } from "../../untils/toast";

const { Search } = Input;

const countLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RegisterPost = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { registerPosts } = useSelector((state) => state.user);

  const [loading, setloading] = useState(true);
  const [posts, setposts] = useState([]);
  const [page, setpage] = useState(1);
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const handleChangePage = (page) => {
    setpage(page);
    searchParams.set("page", page);
    setSearchParams(searchParams);
  };
  // console.log(posts, count);
  const handleSearch = (value) => {
    if (value) {
      searchParams.set("title", value);
    } else {
      searchParams.delete("title");
    }
    setSearchValue(value);
    setSearchParams(searchParams);
  };
  const handleDeletePost = async (id) => {
    const post = registerPosts.find((item) => item.postId === id);
    if (post) {
      const res = await apiDeleteRegisterPost({ postId: id });
      if (res.err === 0) {
        const newRegisterPosts = registerPosts.filter((item) => item.postId !== id);
        dispatch(actions.deletedRegisterPost(newRegisterPosts));
        toastSuccess("Huỷ đăng ký thành công");
      } else {
        toastError("Huỷ thất bại");
      }
    } else {
      const res = await apiAddRegisterPost({ postId: id });
      if (res.err === 0) {
        dispatch(actions.addRegisterPost({ postId: id }));
        toastSuccess("Đăng ký thành công");
      } else {
        toastError("Đăng ký thất bại");
      }
    }
  };

  const hasRegisterPost = (id) => {
    return registerPosts.some((post) => post.postId === id);
  };

  useEffect(() => {
    setloading(true);
    const timer = setTimeout(async () => {
      const res = await userServices.apiGetRegisterPosts({ page, title: searchValue });
      console.log(res);
      if (res.err === 0) {
        setCount(res.data.count);
        setposts(res.data.rows);
        // console.log(res.data);
      }
      setloading(false);
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [page, searchValue]);

  return (
    <div className="h-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between border-b-1 gap-2 border-gray-300 mb-10">
        <h1 className="font-semibold text-3xl mb-4 ">Tin đã đăng ký</h1>
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
      <div className="hidden relative lg:flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
        <div className="flex-auto px-0 pt-0 pb-2">
          <div className="p-0 overflow-x-auto">
            <table className="items-center w-full mb-0 align-top border-gray-200 text-slate-500">
              <thead className="align-bottom">
                <tr>
                  <th className=" p-3 font-bold text-left capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Người đăng tin
                  </th>
                  <th className=" p-3 pl-2 font-bold text-left capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Ảnh
                  </th>
                  <th className=" p-3 font-bold text-center capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Tiêu đề
                  </th>
                  <th className=" p-3 font-bold text-center capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Địa chỉ
                  </th>
                  <th className=" p-3 font-bold text-center capitalize align-middle bg-transparent border-b border-gray-200 shadow-none text-xxs border-b-solid tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Giá
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Ngày hết hạn
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Trạng thái
                  </th>
                  <th className=" p-3 font-semibold capitalize align-middle bg-transparent border-b border-gray-200 border-solid shadow-none tracking-none whitespace-nowrap text-slate-500 opacity-70">
                    Liên hệ
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
                          <td className="p-3 text-center">{post?.userData?.name}</td>
                          <td className="p-3">
                            <figure className="w-[120px] h-[160px]  min-w-full min-h-full shrink-0">
                              <img
                                className="w-full h-full object-cover"
                                src={JSON.parse(post?.imagesData.images)[0]}
                                alt=""
                              />
                            </figure>
                          </td>
                          <td className="p-3 ">
                            <span className="text-center line-clamp-3 max-w-[200px] ">
                              {post?.title}
                            </span>
                          </td>
                          <td className="p-3 ">
                            <span className="text-center line-clamp-3 max-w-[200px] ">
                              {post?.address}
                            </span>
                          </td>
                          <td className="p-3 text-center">{post?.attributesData?.price}</td>
                          <td className="p-3 text-center">{post?.overviews?.expired}</td>
                          <td className="p-3 text-center">
                            {checkStatus(post?.overviews?.expired.split(" ")[3])
                              ? "Còn hạn"
                              : "Hết hạn"}
                          </td>
                          <td className="p-3 text-center">{post?.userData?.phone}</td>
                          <td>
                            <Popconfirm
                              title={
                                hasRegisterPost(post?.id)
                                  ? "Bạn có chắc chắn huỷ đăng ký?"
                                  : "Bạn có muốn đăng ký lại?"
                              }
                              okType={hasRegisterPost(post?.id) ? "danger" : "default"}
                              placement="topRight"
                              onConfirm={() => handleDeletePost(post?.id)}
                            >
                              <Button
                                size="medium"
                                danger={hasRegisterPost(post?.id)}
                                type="primary"
                                ghost
                              >
                                {hasRegisterPost(post?.id) ? "Huỷ đăng ký" : "Đăng ký"}
                              </Button>
                            </Popconfirm>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan={8}>
                        <h2 className="text-xl font-semibold p-3">Bạn chưa đăng ký tin nào</h2>
                      </td>
                    </tr>
                  )
                ) : (
                  countLoading.map((i) => {
                    return (
                      <tr key={i}>
                        <td className="p-3 ">
                          <SkeletonCutom className={"min-w-[80px]"} />
                        </td>
                        <td className="p-3">
                          <SkeletonCutom height={160} className="min-w-[120px] " />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom count={3} className={"min-w-100"} />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom count={3} className={"min-w-100"} />
                        </td>
                        <td className="p-3 ">
                          <SkeletonCutom className={"min-w-100"} />
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
                          <SkeletonCutom className={"p-2 min-w-100"} />
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
      <div className={`lg:hidden grid md:grid-cols-2 gap-3 `}>
        {loading ? (
          countLoading.map((i) => {
            return (
              <div
                key={i}
                className={`w-full bg-gray-100 shadow-md rounded-md border-b-1 border-gray-300 p-4`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <SkeletonCutom className={"min-w-200"} />
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-2">
                  <div className="flex md:flex-col flex-row gap-2">
                    <figure className="w-[120px] h-[160px] rounded-md overflow-hidden ">
                      <SkeletonCutom height={"100%"} />
                    </figure>
                    <SkeletonCutom className={"min-w-[80px]"} />
                    <SkeletonCutom className={"min-w-[80px]"} />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <SkeletonCutom count={2} className={"min-w-[80px]"} />
                    <SkeletonCutom count={3} className={"min-w-[80px]"} />
                    <SkeletonCutom className={"min-w-[80px]"} />
                    <SkeletonCutom className={"min-w-[80px]"} />
                    <SkeletonCutom className={"min-w-100 p-2"} />
                  </div>
                </div>
              </div>
            );
          })
        ) : posts?.length > 0 ? (
          posts.map((post) => {
            return (
              <div
                key={post?.id}
                className={`w-full bg-gray-100 shadow-md rounded-md border-b-1 border-gray-300 p-4 `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-md ">
                    Ngày hết hạn:{" "}
                    <strong className="text-red-500">{post?.overviews?.expired}</strong>
                  </span>
                </div>
                <div className="flex flex-col md:flex-row md:items-start gap-2">
                  <div className="flex flex-row md:flex-col gap-2">
                    <figure className="w-[120px] h-[160px] rounded-md overflow-hidden ">
                      <img
                        src={JSON.parse(post?.imagesData.images)[0]}
                        alt={post?.title}
                        className={"w-full h-full object-cover"}
                      />
                    </figure>
                    <span className="text-sm font-semibold ">{post?.userData?.name}</span>
                    <strong className="text-md text-blue-400">{post?.userData?.phone}</strong>
                  </div>
                  <div className="flex flex-col justify-between gap-2 flex-1">
                    <h2 className="font-semibold line-clamp-2">{post?.title}</h2>
                    <span className="text-sm text-gray-500 line-clamp-3">{post?.address}</span>
                    <span className="text-sm text-gray-500">{post?.attributesData?.price}</span>
                    <span className="text-sm flex-1 text-red-400">
                      {checkStatus(post?.overviews?.expired.split(" ")[3]) ? "Còn hạn" : "Hết hạn"}
                    </span>
                    <Popconfirm
                      title={
                        hasRegisterPost(post?.id)
                          ? "Bạn có chắc chắn huỷ đăng ký?"
                          : "Bạn có muốn đăng ký lại?"
                      }
                      okType={hasRegisterPost(post?.id) ? "danger" : "default"}
                      placement="topRight"
                      onConfirm={() => handleDeletePost(post?.id)}
                    >
                      <Button size="medium" danger={hasRegisterPost(post?.id)} type="primary" ghost>
                        {hasRegisterPost(post?.id) ? "Huỷ đăng ký" : "Đăng ký"}
                      </Button>
                    </Popconfirm>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <h2 className="font-semibold text-xl p-3">Bạn chưa đăng ký tin nào</h2>
        )}
      </div>
      <Pagination
        className="mt-4"
        defaultCurrent={page}
        // hideOnSinglePage
        total={count}
        defaultPageSize={process.env.REACT_APP_LIMIT_POSTS}
        onChange={(page) => handleChangePage(page)}
      />
    </div>
  );
};

RegisterPost.propTypes = {};

export default RegisterPost;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import Swal from "sweetalert2";

import * as actions from "../../store/actions";
import { Button } from "../../components";
import UpdatePost from "./UpdatePost";
import { useLocation } from "react-router-dom";
import { apiDeletePostPrivate } from "../../services/post";
const ManagerPost = (props) => {
    const dispath = useDispatch();

    const { posts, post } = useSelector((state) => state.user);
    const [refreshPage, setrefreshPage] = useState(false);
    const [isEdit, setisEdit] = useState(false);

    useEffect(() => {
        Object.keys(post).length === 0 && dispath(actions.getPostsPrivate());
    }, [post, refreshPage]);

    // useEffect(() => {}, []);

    const checkStatus = (date) => {
        const today = new Date().toDateString();
        return moment(date, process.env.REACT_APP_FORMAT_DATE).isSameOrAfter(today);
    };

    const handleDeletePost = async (post) => {
        console.log(post);
        const payload = {
            postId: post.id,
            attributesId: post.attributesId,
            imagesId: post.imagesId,
            overviewId: post.overviewId,
        };
        console.log(payload);

        const res = await apiDeletePostPrivate(payload);
        // console.log(res);
        if (res.data > 0) {
            Swal.fire("Thành công ", "thanh cong", "success");
            setrefreshPage(!refreshPage);
        } else {
            Swal.fire("Thất bại", "Có lỗi", "error");
        }
    };

    const handleFilterPost = (code) => {};
    return (
        <div className="px-8 h-full">
            <div className="flex items-center justify-between border-b-1 border-gray-300">
                <h1 className="font-semibold text-3xl py-4 ">Quản lý tin đăng</h1>
                <select onChange={(e) => handleFilterPost(e.target.value)}>
                    <option value="">--Lọc theo trạng thái--</option>
                    <option value="0">--Đang hoạt động--</option>
                    <option value="1">--Hết hạn--</option>
                </select>
            </div>
            <div className="relative flex flex-col w-full min-w-0 mb-0 break-words bg-white border-0 border-transparent border-solid shadow-soft-xl rounded-2xl bg-clip-border">
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
                                {posts?.length > 0 &&
                                    posts.map((post) => {
                                        return (
                                            <tr key={post?.id}>
                                                <td className="text-center">
                                                    {post?.overviews?.code}
                                                </td>
                                                <td>
                                                    <figure className="max-w-[120px] w-full h-full">
                                                        <img
                                                            className="w-full h-full object-cover"
                                                            src={
                                                                JSON.parse(
                                                                    post?.imagesData.images,
                                                                )[0]
                                                            }
                                                            alt=""
                                                        />
                                                    </figure>
                                                </td>
                                                <td className="text-center">{post?.title}</td>
                                                <td className="text-center">
                                                    {post?.attributesData?.price}
                                                </td>
                                                <td className="text-center">
                                                    {post?.overviews?.created}
                                                </td>
                                                <td className="text-center">
                                                    {post?.overviews?.expired}
                                                </td>
                                                <td className="text-center">
                                                    {checkStatus(
                                                        post?.overviews?.expired.split(" ")[3],
                                                    )
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
                                                                setisEdit(true);
                                                                dispath(
                                                                    actions.editPostPrivate(post),
                                                                );
                                                            }}
                                                        />
                                                        <Button
                                                            text="Xoá"
                                                            bgColor={"bg-red-500"}
                                                            textColor="text-white"
                                                            onClick={() => handleDeletePost(post)}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {isEdit && (
                <div
                    className="absolute inset-0 flex bg-overlay-50"
                    onClick={(e) => {
                        e.stopPropagation();
                        setisEdit(false);
                    }}
                >
                    <UpdatePost setisEdit={setisEdit} />
                </div>
            )}
        </div>
    );
};

ManagerPost.propTypes = {};

export default ManagerPost;

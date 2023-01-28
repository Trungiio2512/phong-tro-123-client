import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ListSitem, Sitem } from "./index";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { formatVietnameseToString } from "../untils/common/fn";
import { apiGetNewPosts } from "../services/post";
const countLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RelatedPost = ({
    categoryCode,
    title = "Tin mới đăng",
    limit,
    order,
    counts = countLoading,
}) => {
    const location = useLocation();

    const [loading, setloading] = useState(true);
    const [newPosts, setnewPosts] = useState([]);
    const { categories } = useSelector((state) => state.app);

    useEffect(() => {
        // từ state categories dựa theo pathname của trang đó lấy ra category trang đó
        // console.log(location.pathname);
        const category = categories.find(
            (i) => `/${formatVietnameseToString(i.value)}` === location.pathname,
        );
        setloading(true);
        const timerfc = setTimeout(async () => {
            const queries = {
                categoryCode: categoryCode ? categoryCode : category?.code,
                limit,
                order,
            };
            // console.log(queries);
            const res = await apiGetNewPosts(queries);
            // console.log(res);
            if (res.err === 0) {
                setnewPosts(res.data);
                setloading(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timerfc);
        };
    }, [categories, categoryCode, limit, location.pathname, order]);

    // useEffect(() => {
    //     newPosts.length > 0 &&
    // }, [newPosts.length]);

    return (
        <div className="p-4 bg-white w-full rounded-lg  border border-gray-300">
            <h3 className="font-semibold text-lg">{title}</h3>
            <div className="w-full">
                <ListSitem loading={loading} posts={newPosts} counts={counts} />
            </div>
        </div>
    );
};

RelatedPost.propTypes = {};

export default memo(RelatedPost);

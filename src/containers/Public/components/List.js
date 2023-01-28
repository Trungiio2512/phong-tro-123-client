import React, { memo, useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Item } from "../../../components";
import PropTypes from "prop-types";
import * as actions from "../../../store/actions";
import { useSearchParams } from "react-router-dom";

const countItemLoading = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const List = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const { posts } = useSelector((state) => state.post);

    const [loading, setloading] = useState(true);
    const [sort, setsort] = useState(0);

    useEffect(() => {
        // setloading(true);
        const params = [];

        for (let entry of searchParams.entries()) {
            params.push(entry);
        }

        let searchQueryParams = {};

        params?.forEach((i) => {
            // từ v2 key có trong obj searchQueryParams hay không
            if (Object.keys(searchQueryParams)?.some((item) => item === i[0])) {
                // gộp value có key giống nàu thanh 1 mảng
                searchQueryParams[i[0]] = [...searchQueryParams[i[0]], i[1]];
            } else {
                searchQueryParams = { ...searchQueryParams, [i[0]]: [i[1]] };
            }
        });
        if (categoryCode) searchQueryParams.categoryCode = categoryCode;
        if (sort === 1) {
            searchQueryParams.order = ["createdAt", "DESC"];
        }
        setloading(true);
        const timerfc = setTimeout(() => {
            setloading(false);
            dispatch(actions.getPostsLimit(searchQueryParams));
        }, 3000);

        return () => {
            clearTimeout(timerfc);
        };
    }, [categoryCode, dispatch, searchParams, sort]);

    return (
        <div className="w-full border border-gray-300 p-4 rounded-lg bg-white shadow-md">
            <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold ">Danh sách tin đăng</h3>
            </div>
            <div className="flex items-center justify-start gap-2 mb-2 ">
                <span>Sap xep :</span>
                <span
                    className={`text-md p-2 cursor-pointer rounded-md  ${
                        sort === 0 ? "text-red-500" : "bg-gray-300"
                    }`}
                    onClick={() => setsort(0)}
                >
                    Mặc định
                </span>
                <span
                    className={`text-md p-2 cursor-pointer rounded-md  ${
                        sort === 1 ? "text-red-500" : "bg-gray-300"
                    }`}
                    onClick={() => setsort(1)}
                >
                    Mới nhất
                </span>
            </div>
            <div className="">
                {!loading ? (
                    posts.length > 0 ? (
                        posts?.map((post) => {
                            return (
                                <Item
                                    key={post?.id}
                                    title={post?.title}
                                    address={post?.address}
                                    attributes={post?.attributesData}
                                    description={JSON.parse(post?.description)}
                                    images={JSON.parse(post?.imagesData?.images)}
                                    star={+post?.star}
                                    user={post?.userData}
                                    id={post?.id}
                                    categoryCode={post?.categoryCode}
                                    labelCode={post?.labelData?.code}
                                />
                            );
                        })
                    ) : (
                        <h2>Không tìm thấy kết quả phù hợp</h2>
                    )
                ) : (
                    countItemLoading.map((item) => {
                        return <Item key={item} loading={loading} />;
                    })
                )}

                {/* <Item />
                <Item /> */}
            </div>
        </div>
    );
};

List.propTypes = {
    categoryCode: PropTypes.string,
};

export default memo(List);

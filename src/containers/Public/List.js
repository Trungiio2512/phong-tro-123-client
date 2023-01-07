import React, { memo, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Item } from "../../components";
import PropTypes from "prop-types";
import * as actions from "../../store/actions";
import { useSearchParams } from "react-router-dom";

const List = ({ categoryCode }) => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    const { posts } = useSelector((state) => state.post);

    useEffect(() => {
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
        // console.log(searchQueryParams);
        dispatch(actions.getPostsLimit(searchQueryParams));
    }, [categoryCode, dispatch, searchParams]);

    return (
        <div className="w-full  border border-gray-300 p-4 rounded-lg bg-white shadow-md">
            <div className="flex items-baseline justify-between mb-3">
                <h3 className="text-lg font-semibold ">Danh sach tin dang</h3>
                <span>cap nhat ngay 25-12-2022</span>
            </div>
            <div className="flex items-center gap-1 mb-2">
                <span>Sap xep :</span>
                <Button text="Mặc định" bgColor={"bg-gray-200"} />
                <Button text="Mới nhất" bgColor={"bg-gray-200"} />
            </div>
            <div className="">
                {posts &&
                    posts.length > 0 &&
                    posts.map((post) => {
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
                            />
                        );
                    })}

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

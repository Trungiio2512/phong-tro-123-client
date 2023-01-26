import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import { apiGetPost } from "../../services/post";
import { SkeletonCutom, SliderPost } from "../../components";
import icons from "../../untils/icons";
import { TableRow } from "./components";

const { GrStar, MdLocationOn, SlCrop, TbReportMoney, HiHashtag, HiOutlineClock } = icons;
const DetailPost = (props) => {
    const loaction = useLocation();
    const { id } = loaction.state;
    const [postDetail, setpostDetail] = useState({});
    const [loading, setloading] = useState(false);

    useEffect(() => {
        console.log(id);
        setloading(true);
        const timerfc = setTimeout(async () => {
            const res = await apiGetPost(id);
            setpostDetail(res.data);
            console.log(res.data);
            setloading(false);
        }, 3000);
        return () => {
            clearTimeout(timerfc);
        };
    }, [id]);

    return (
        <div className="flex gap-5">
            <div className="w-8/12">
                {loading ? (
                    <SkeletonCutom height={317} />
                ) : (
                    <div className="w-full bg-black">
                        <SliderPost
                            images={
                                Object.keys(postDetail).length > 0 &&
                                JSON.parse(postDetail?.imagesData.images)
                            }
                        />
                    </div>
                )}
                <div className="border border-gray-300 p-5 rounded-b-md flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl gap-2 text-red-600 uppercase font-bold line-clamp-2">
                            {loading ? <SkeletonCutom /> : postDetail?.title}
                        </h2>
                        {loading ? (
                            <SkeletonCutom count={1} />
                        ) : (
                            <p className="flex items-center gap-2">
                                <span>Chuyển mục:</span>
                                <strong className="text-blue-600">
                                    {postDetail?.overviews?.area}
                                </strong>
                            </p>
                        )}
                        {loading ? (
                            <SkeletonCutom count={1} />
                        ) : (
                            <div className="flex items-center gap-2">
                                <span>
                                    {<MdLocationOn size={18} className="text-blue-600 underline" />}
                                </span>
                                <p>{postDetail?.address}</p>
                            </div>
                        )}
                        {loading ? (
                            <SkeletonCutom count={1} />
                        ) : (
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-1">
                                    <span>
                                        {<TbReportMoney className="text-gray-400" size={20} />}
                                    </span>
                                    <span className="text-xl text-green-500 font-semibold">
                                        {postDetail?.attributesData?.price}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{<SlCrop className="text-gray-400" size={18} />}</span>
                                    <span>{postDetail?.attributesData?.acreage}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>
                                        {<HiOutlineClock className="text-gray-400" size={18} />}
                                    </span>
                                    <span>{postDetail?.attributesData?.published}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <span>{<HiHashtag className="text-gray-400" size={18} />}</span>
                                    <span>{postDetail?.attributesData?.hashtag}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-333">Thông tin mô tả</h3>
                        <div className="flex flex-col gap-2 mt-2">
                            {loading ? (
                                <SkeletonCutom height={400} />
                            ) : (
                                postDetail?.description &&
                                (JSON.parse(postDetail.description) ||
                                    JSON.parse(postDetail.description)?.map((item, index) => {
                                        return (
                                            <span key={index} className="text-333 text-base">
                                                {item}
                                            </span>
                                        );
                                    }))
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-333">Đặc điểm tin đăng</h3>
                        <table className="table-name w-full mt-3">
                            <tbody>
                                <TableRow
                                    label="Mã tin"
                                    loading={loading}
                                    value={postDetail?.overviews?.code}
                                />
                                <TableRow
                                    label="Khu vực"
                                    loading={loading}
                                    value={postDetail?.overviews?.area}
                                />
                                <TableRow
                                    label="Loại tin rao"
                                    loading={loading}
                                    value={postDetail?.overviews?.type}
                                />

                                <TableRow
                                    label="Đối tượng thuê"
                                    loading={loading}
                                    value={postDetail?.overviews?.target}
                                />
                                <TableRow
                                    label="Gói tin"
                                    loading={loading}
                                    value={postDetail?.overviews?.bonus}
                                />
                                <TableRow
                                    label="Ngày đăng"
                                    loading={loading}
                                    value={postDetail?.overviews?.created}
                                />
                                <TableRow
                                    label="Ngày hết hạn"
                                    loading={loading}
                                    value={postDetail?.overviews?.expired}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="w-4/12">content</div>
        </div>
    );
};

DetailPost.propTypes = {};

export default DetailPost;

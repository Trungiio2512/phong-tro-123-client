import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { createSearchParams } from "react-router-dom";

import { apiGetPost, apiGetPostsLitmit } from "../../services/post";
import { Button, Item, ListItem, RelatedPost, SkeletonCutom, SliderPost } from "../../components";
import icons from "../../untils/icons";
import { TableRow } from "./components";
import { base64Tofile } from "../../untils/common/base64";
import notavatar from "../../assests/img_user_default_nobg.png";
import { path } from "../../untils/constant";
import { useDispatch, useSelector } from "react-redux";
import { apiCreateLovePost, apiDeleteLovePost } from "../../services/lovePost";
import * as actions from "../../store/actions";
import { toastError, toastSuccess } from "../../untils/toast";
import { apiAddRegisterPost, apiDeleteRegisterPost } from "../../services/registerPost";
const {
  GrStar,
  MdLocationOn,
  SlCrop,
  TbReportMoney,
  HiHashtag,
  HiOutlineClock,
  BsFillTelephoneFill,
  BsHeartFill,
  BsHeart,
} = icons;
const countItemLoading = [1, 2, 3, 4, 5];

const DetailPost = (props) => {
  const loaction = useLocation();
  const dispatch = useDispatch();
  const { id, categoryCode, labelCode } = loaction.state;
  const { lovePosts, registerPosts } = useSelector((state) => state.user);


  const [postDetail, setpostDetail] = useState({});
  const [posts, setposts] = useState([]);
  const [loading, setloading] = useState(false);
  const handleLovePost = async (id) => {
    const love = lovePosts.find((item) => item.postId === id);
    if (love) {
      const res = await apiDeleteLovePost({ postId: id });
      if (res.err === 0) {
        const newLovePosts = lovePosts.filter((item) => item.id !== love.id);
        dispatch(actions.deletedLovePost(newLovePosts));
        toastSuccess("Đã xoá khỏi yêu thích");
      } else {
        toastError("Xoá thất bại");
      }
    } else {
      const res = await apiCreateLovePost({ postId: id });
      if (res.err === 0) {
        dispatch(actions.addLovePost(res.data));
        toastSuccess("Thêm thành công");
      } else {
        toastError("Thêm thất bại");
      }
    }
  };

  const handleRegisterPost = async (id) => {
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
        toastSuccess("Thêm thành công");
      } else {
        toastError("Thêm thất bại");
      }
    }
  };

  useEffect(() => {
    setloading(true);
    const timerfc = setTimeout(async () => {
      const [res1, res2] = await Promise.all([
        apiGetPost(id),
        apiGetPostsLitmit({
          limit: 5,
          labelCode,
          categoryCode,
        }),
      ]);
      setpostDetail(res1.data);
      setposts(res2.data.rows);
      // console.log(res2.data);
      setloading(false);
    }, 3000);
    return () => {
      clearTimeout(timerfc);
    };
  }, [categoryCode, id]);
  // console.log(posts);
  return (
    <div className="flex gap-5">
      <div className="w-8/12">
        {loading ? (
          <SkeletonCutom height={335} />
        ) : (
          <div className="w-full bg-black">
            <SliderPost
              images={
                Object.keys(postDetail).length > 0 && JSON.parse(postDetail?.imagesData.images)
              }
            />
          </div>
        )}
        <div className="border border-gray-300 p-5 rounded-b-md flex flex-col gap-4">
          <section className="flex flex-col gap-2">
            <h2 className="text-xl gap-2 text-red-600 uppercase font-bold line-clamp-2">
              {loading ? <SkeletonCutom /> : postDetail?.title}
            </h2>
            {loading ? (
              <SkeletonCutom count={1} />
            ) : (
              <p className="flex items-center gap-2">
                <span>Chuyển mục:</span>
                <Link to={`/${path.SEARCH}/`} className="text-blue-600 hover:underline">
                  {postDetail?.labelData?.value}
                </Link>
              </p>
            )}
            {loading ? (
              <SkeletonCutom count={1} />
            ) : (
              <div className="flex items-center gap-2">
                <span>{<MdLocationOn size={18} className="text-blue-600 underline" />}</span>
                <p>{postDetail?.address}</p>
              </div>
            )}
            {loading ? (
              <SkeletonCutom count={1} />
            ) : (
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-1">
                  <span>{<TbReportMoney className="text-gray-400" size={20} />}</span>
                  <span className="text-xl text-green-500 font-semibold">
                    {postDetail?.attributesData?.price}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{<SlCrop className="text-gray-400" size={18} />}</span>
                  <span>{postDetail?.attributesData?.acreage}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{<HiOutlineClock className="text-gray-400" size={18} />}</span>
                  <span>{postDetail?.attributesData?.published}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span>{<HiHashtag className="text-gray-400" size={18} />}</span>
                  <span>{postDetail?.attributesData?.hashtag}</span>
                </div>
              </div>
            )}
          </section>
          <section>
            <h3 className="text-xl font-bold text-333">Thông tin mô tả</h3>
            <div className="flex flex-col gap-2 mt-2">
              {loading ? (
                <SkeletonCutom height={400} />
              ) : (postDetail.description && typeof JSON.parse(postDetail.description)) ===
                "object" ? (
                JSON.parse(postDetail.description)?.map((item, index) => {
                  return (
                    <span key={index} className="text-333 text-base">
                      {item}
                    </span>
                  );
                })
              ) : (
                postDetail.description && JSON.parse(postDetail?.description)
              )}
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold text-333">Đặc điểm tin đăng</h3>
            <table className="table-name w-full mt-3">
              <tbody>
                <TableRow label="Mã tin" loading={loading} value={postDetail?.overviews?.code} />
                <TableRow label="Khu vực" loading={loading} value={postDetail?.overviews?.area} />
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
                <TableRow label="Gói tin" loading={loading} value={postDetail?.overviews?.bonus} />
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
          </section>
          <section>
            <h3 className="text-xl font-bold text-333">Thông tin liên hệ</h3>
            <table className="table-name w-full mt-3">
              <tbody>
                <TableRow label="Liên hệ" loading={loading} value={postDetail?.userData?.name} />
                <TableRow
                  label="Điện thoại"
                  loading={loading}
                  value={postDetail?.userData?.phone}
                />
                <TableRow label="Zalo" loading={loading} value={postDetail?.userData?.zalo} />
              </tbody>
            </table>
          </section>
        </div>
        <div className="mt-6 p-5 rounded-md border border-gray-300">
          <div className="flex items-baseline justify-between mb-3">
            <h3 className="text-lg font-semibold ">
              {!loading && postDetail?.labelData?.value ? (
                postDetail?.labelData?.value
              ) : (
                <SkeletonCutom className={"min-w-200"} />
              )}
            </h3>
          </div>
          <ListItem posts={posts} loading={loading} counts={countItemLoading} />
        </div>
      </div>
      <aside className="w-4/12 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2 bg-[#febb02] rounded-md p-4">
          <figure className="w-[80px] h-[80px] rounded-full overflow-hidden">
            {loading ? (
              <SkeletonCutom circle height={"100%"} />
            ) : (
              <img
                className="w-full h-full object-cover"
                src={base64Tofile(postDetail?.userData?.avatar) || notavatar}
                alt={postDetail?.userData?.name}
              />
            )}
          </figure>
          {loading ? (
            <SkeletonCutom className={"min-w-200"} />
          ) : (
            <span className="font-bold text-xl">{postDetail?.userData?.name}</span>
          )}
          {loading ? (
            <SkeletonCutom className={"min-w-200 p-3"} />
          ) : (
            <Button
              isBefore
              Icon={BsFillTelephoneFill}
              textColor={"text-white"}
              bgColor={"bg-[#16C784]"}
              text={postDetail?.userData?.phone}
              className={"min-w-200 h-[40px] text-xl font-bold tracking-wide "}
            />
          )}

          {loading ? (
            <SkeletonCutom className={"min-w-200 p-3"} />
          ) : (
            <Button
              bgColor={"bg-white"}
              text={"Nhắn zalo"}
              className={"border-2 h-[40px] border-gray-800 text-sm font-bold min-w-200"}
              textColor={"text-333"}
            />
          )}

          {loading ? (
            <SkeletonCutom className={"min-w-200 p-3"} />
          ) : (
            <Button
              isBefore
              Icon={lovePosts.some((post) => post.postId === postDetail.id) ? BsHeart : BsHeartFill}
              bgColor={"bg-white"}
              text={`${
                lovePosts.some((post) => post.postId === postDetail.id)
                  ? "Huỷ yêu thích"
                  : "Yêu thích"
              }`}
              textColor={
                lovePosts.some((post) => post.postId === postDetail.id)
                  ? "text-pink-600"
                  : "text-333"
              }
              className={`border-2 h-[40px] text-sm font-bold min-w-200 ${
                lovePosts.some((post) => post.postId === postDetail.id)
                  ? "border-pink-600"
                  : "border-gray-800 "
              }`}
              onClick={() => handleLovePost(postDetail.id)}
            />
          )}
          {loading ? (
            <SkeletonCutom className={"min-w-200 p-3"} />
          ) : (
            <Button
              bgColor={"bg-white"}
              text={`${
                registerPosts.some((post) => post.postId === postDetail.id)
                  ? "Huỷ đăng ký"
                  : "Đăng ký"
              }`}
              textColor={`${
                registerPosts.some((post) => post.postId === postDetail.id)
                  ? "text-red-600"
                  : "text-gray-800 "
              }`}
              className={`border-2 h-[40px] text-sm font-bold min-w-200 ${
                registerPosts.some((post) => post.postId === postDetail.id)
                  ? "border-red-600"
                  : "border-gray-600"
              }`}
              onClick={() => handleRegisterPost(postDetail.id)}
            />
          )}
        </div>
        <RelatedPost
          categoryCode={categoryCode}
          title="Tin nổi bật"
          limit={5}
          order={["star", "DESC"]}
          counts={[1, 2, 3, 4, 5]}
        />

        <RelatedPost />
      </aside>
    </div>
  );
};

DetailPost.propTypes = {};

export default DetailPost;

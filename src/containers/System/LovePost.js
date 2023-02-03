import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Pagination } from "antd";

import { ListItem } from "../../components";
import * as userServices from "../../services/user";
import { useSearchParams } from "react-router-dom";

const LovePost = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setloading] = useState(true);
  const [posts, setposts] = useState([]);
  const [count, setcount] = useState(0);
  const [page, setpage] = useState(1);
  useEffect(() => {
    setloading(true);
    const timer = setTimeout(async () => {
      const res = await userServices.apiGetLovePosts({ page });
      if (res.err === 0) {
        // console.log(res.data.rows);
        setposts(res.data.rows);
        setcount(res.data.count);
        setloading(false);
      }
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [page]);
  return (
    <div className="h-full">
      <h2 className="text-2xl text-gray-700 font-bold mb-2">Bài đăng yêu thích</h2>
      <ListItem posts={posts} loading={loading} counts={[1, 2, 3, 4, 5]} />
      <Pagination
        hideOnSinglePage
        total={count}
        defaultCurrent={page}
        onChange={(page) => {
          // if(page)
          searchParams.set("page", page);
          setSearchParams(searchParams);
          setpage(page);
        }}
        defaultPageSize={process.env.REACT_APP_LIMIT_POSTS}
      />
    </div>
  );
};

LovePost.propTypes = {};

export default LovePost;

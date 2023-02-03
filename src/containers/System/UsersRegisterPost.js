import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Row, Col, Button } from "antd";
import { apiGetUsersRegisterPosts } from "../../services/user";
import { SkeletonCutom } from "../../components";

const UsersRegisterPost = (props) => {
  const [loading, setloading] = useState(true);
  const [data, setData] = useState([]);
  useEffect(() => {
    setloading(true);
    const timerLoading = setTimeout(async () => {
      const res = await apiGetUsersRegisterPosts();
      setloading(false);
      setData(res.data);
    }, 2000);

    return () => {
      clearTimeout(timerLoading);
    };
  }, []);

  return (
    <div className="h-full bg-blue-100">
      <h2 className="text-2xl text-gray-700 font-bold mb-4 border-b-1 border-gray-400 pb-2">
        Những người đã đăng ký tin
      </h2>
      {!loading ? (
        data.length > 0 ? (
          data.map((item, index) => {
            return (
              <Row gutter={[16, 16]} key={item?.id}>
                <Col sm={24} md={16} lg={14}>
                  <h2 className="text-xl font-semibold mb-2">Bài đăng {index + 1}</h2>
                  <div className="flex md:flex-row flex-col gap-4 p-4 bg-white rounded-md shadow-md border border-gray-300">
                    <figure className="md:w-[180px] w-full h-[280px] rounded-md border border-gray-400 overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={JSON.parse(item?.imagesData?.images)[0]}
                        alt={item?.title}
                      />
                    </figure>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-xl text-blue-500 font-semibold">{item?.title}</h3>
                      <span className="text-md text-gray-400 font-medium">{item?.address}</span>
                    </div>
                  </div>
                </Col>
                <Col sm={24} md={8} lg={10}>
                  <h2 className="text-xl font-semibold mb-2">Người đăng ký bài đăng {index + 1}</h2>
                  {item?.postRegisterByUsers.length > 0 && (
                    <ul className="p-4 flex flex-col gap-2 bg-white rounded-md shadow-md border border-gray-300 list-decimal">
                      {item?.postRegisterByUsers.map((user) => {
                        return (
                          <li
                            key={user?.id}
                            className="flex flex-col gap-2 border-b-1 border-green-300 pb-2"
                          >
                            <span className="text-md">
                              Tên người đăng ký: <strong>{user?.name}</strong>
                            </span>
                            <span className="text-md">
                              Số điện thoại: <strong>{user?.phone}</strong>
                            </span>
                            <span className="text-md">
                              Zalo: <strong>{user?.zalo}</strong>
                            </span>
                            <Button type="primary" ghost>
                              Xác nhận
                            </Button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </Col>
              </Row>
            );
          })
        ) : (
          <h2 className="text-xl text-gray-500 font-bold ">Không tìm thấy bài đăng nào</h2>
        )
      ) : (
        [1, 2].map((item) => {
          return (
            <Row gutter={[16, 16]} key={item}>
              <Col sm={24} md={16} lg={14}>
                <h2 className="mb-2">
                  {" "}
                  <SkeletonCutom className={"max-w-[200px] w-full"} />
                </h2>
                <div className="flex md:flex-row flex-col gap-4 p-4 bg-white rounded-md shadow-md border border-gray-300">
                  <figure className="md:w-[180px] w-full h-[280px] rounded-md border border-gray-400 overflow-hidden">
                    <SkeletonCutom height={"100%"} />
                  </figure>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl text-blue-500 font-semibold">
                      {" "}
                      <SkeletonCutom className={"min-w-200"} />
                    </h3>
                    <span className="text-md text-gray-400 font-medium line-clamp-3">
                      {" "}
                      <SkeletonCutom className={"min-w-200"} count={3} />
                    </span>
                  </div>
                </div>
              </Col>
              <Col sm={24} md={8} lg={10}>
                <h2 className="mb-2">
                  <SkeletonCutom className={"max-w-[200px] w-full"} />
                </h2>

                <ul className="p-4 flex flex-col gap-2 bg-white rounded-md shadow-md border border-gray-300 list-decimal">
                  <li className="flex flex-col gap-2">
                    <span className="text-md">
                      <SkeletonCutom className={"min-w-200"} />
                    </span>
                    <span className="text-md">
                      <SkeletonCutom className={"min-w-200"} />
                    </span>
                    <span className="text-md">
                      <SkeletonCutom className={"min-w-200"} />
                    </span>
                    <span className="text-md">
                      <SkeletonCutom className={"min-w-[80px] p-2"} />
                    </span>
                  </li>
                </ul>
              </Col>
            </Row>
          );
        })
      )}
    </div>
  );
};

UsersRegisterPost.propTypes = {};

export default UsersRegisterPost;

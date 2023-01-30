import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Col, Row } from "antd";

import { apiStatistic } from "../../services/admin";
import { SkeletonCutom } from "../../components";

const Statistic = (props) => {
    const [data, setdata] = useState([]);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        setloading(true);
        const timerLoading = setTimeout(async () => {
            const res = await apiStatistic();
            if (res.err === 0) {
                setdata(res.data);
                setloading(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timerLoading);
        };
    }, []);
    console.log(loading);
    return (
        <div className="w-full h-full">
            {!loading ? (
                <Row gutter={[24, 24]}>
                    {data.length > 0 &&
                        data.map((item) => {
                            return (
                                <Col key={item?.count} xs={24} sm={24} md={12} lg={6}>
                                    <div className="w-full">
                                        <h2 className="text-center text-lg font-semibold mb-2">
                                            {item?.name}
                                        </h2>
                                        <span className="p-4 block text-2xl text-white text-center bg-green-400 rounded-md">
                                            {item.count}
                                        </span>
                                    </div>
                                </Col>
                            );
                        })}
                </Row>
            ) : (
                <Row gutter={[24, 24]}>
                    {[1, 2, 3, 4].map((item) => {
                        return (
                            <Col key={item} xs={24} sm={24} md={12} lg={6}>
                                <div className="w-full">
                                    <SkeletonCutom className={"min-w-200"} />
                                    <SkeletonCutom className={"min-w-200"} height={50} />
                                </div>
                            </Col>
                        );
                    })}
                </Row>
            )}
        </div>
    );
};

Statistic.propTypes = {};

export default Statistic;

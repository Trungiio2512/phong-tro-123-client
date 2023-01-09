import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Select } from "../components";
import {
    getPublicDistricts,
    getPublicProvinces,
    getPublicWards,
} from "../../../services/apiPublic";

const Address = (props) => {
    //list
    const [provinces, setprovinces] = useState([]);
    const [districts, setdistricts] = useState([]);
    const [wards, setwards] = useState([]);

    //id
    const [province, setprovince] = useState("");
    const [district, setdistrict] = useState("");
    const [ward, setward] = useState("");

    const [reset, setreset] = useState(false);

    useEffect(() => {
        const fs = async () => {
            const res = await getPublicProvinces();
            // console.log(res);
            setprovinces(res?.results);
        };
        fs();
    }, []);
    //api get district
    useEffect(() => {
        const fs = async () => {
            const res = await getPublicDistricts(province);
            // console.log(res);
            setdistricts(res?.results);
        };
        if (province) {
            setreset(false);
            fs();
        } else {
            setreset(true);
        }
    }, [province]);
    // api get ward
    useEffect(() => {
        const fs = async () => {
            const res = await getPublicWards(district);
            // console.log(res);
            setwards(res?.results);
        };
        district && fs();
    }, [district]);
    // console.log(district);
    useEffect(() => {
        if (reset) {
            setdistrict("");
            setward("");
        }
    }, [reset]);

    return (
        <div>
            <h2 className="text-xl font-medium py-4">Địa chỉ cho thuê</h2>
            <div className="flex flex-col gap-4">
                <div className="flex items-center justify-around gap-2">
                    <Select
                        label="Tỉnh/Thành phố"
                        value={province}
                        type="province"
                        setValue={setprovince}
                        options={provinces}
                        reset={reset}
                    />
                    <Select
                        label="Quận/Huyện"
                        type="district"
                        value={district}
                        setValue={setdistrict}
                        options={districts}
                        reset={reset}
                    />
                    <Select
                        label="Xã/Phường"
                        value={ward}
                        setValue={setward}
                        options={wards}
                        reset={reset}
                        type="ward"
                    />
                    {/* <Select label="Đường phố" /> */}
                </div>
                <div>
                    <h3 className="font-medium">Địa chỉ chính xác</h3>
                    <input
                        type={"text"}
                        readOnly
                        className="border border-gray-300 outline-none p-2 w-full rounded-md bg-gray-200"
                        value={`${
                            ward ? wards.find((item) => item?.ward_id === ward)?.ward_name : ""
                        } ${
                            district
                                ? districts.find((item) => item?.district_id === district)
                                      ?.district_name
                                : ""
                        } ${
                            province
                                ? provinces.find((item) => item?.province_id === province)
                                      ?.province_name
                                : ""
                        }`}
                    />
                </div>
            </div>
        </div>
    );
};

Address.propTypes = {};

export default memo(Address);

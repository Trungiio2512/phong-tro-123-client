import React, { memo, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { InputReadOnly, Select } from "../components";
import {
    getPublicDistricts,
    getPublicProvinces,
    getPublicWards,
} from "../../../services/apiPublic";

const Address = ({ setpayload, invalidFields, setinvalidFields }) => {
    //list
    const [provinces, setprovinces] = useState([]);
    const [districts, setdistricts] = useState([]);
    const [wards, setwards] = useState([]);

    //id
    const [province, setprovince] = useState("");
    const [district, setdistrict] = useState("");
    const [ward, setward] = useState("");

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
        setwards([]);
        setward("");
        setdistrict("");
        setdistricts([]);
        const fs = async () => {
            const res = await getPublicDistricts(province);
            // console.log(res);
            setdistricts(res?.results);
        };
        if (province) {
            fs();
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

    useEffect(() => {
        setpayload((prev) => {
            return {
                ...prev,
                province: province
                    ? provinces.find((item) => item?.province_id === province)?.province_name
                    : "",
                address: `${
                    ward && wards.length > 0
                        ? wards.find((item) => item?.ward_id === ward)?.ward_name
                        : ""
                }${ward && ","}${
                    district && districts.length > 0
                        ? districts.find((item) => item?.district_id === district)?.district_name
                        : ""
                }${district && ","}${
                    province
                        ? provinces.find((item) => item?.province_id === province)?.province_name
                        : ""
                }`,
            };
        });
    }, [district, districts, province, provinces, setpayload, ward, wards]);

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
                        invalidFields={invalidFields}
                        setinvalidFields={setinvalidFields}
                    />
                    <Select
                        label="Quận/Huyện"
                        type="district"
                        value={district}
                        setValue={setdistrict}
                        options={districts}
                        setinvalidFields={setinvalidFields}
                        invalidFields={invalidFields}
                    />
                    <Select
                        label="Xã/Phường"
                        value={ward}
                        setValue={setward}
                        options={wards}
                        type="ward"
                        setinvalidFields={setinvalidFields}
                        invalidFields={invalidFields}
                    />
                    {/* <Select label="Đường phố" /> */}
                </div>
                <InputReadOnly
                    label={"Địa chỉ chính xác"}
                    value={`${
                        ward && wards.length > 0
                            ? wards.find((item) => item?.ward_id === ward)?.ward_name
                            : ""
                    }${ward && ","}${
                        district && districts.length > 0
                            ? districts.find((item) => item?.district_id === district)
                                  ?.district_name
                            : ""
                    }${district && ","}${
                        province
                            ? provinces.find((item) => item?.province_id === province)
                                  ?.province_name
                            : ""
                    }`}
                />
            </div>
        </div>
    );
};

Address.propTypes = {};

export default memo(Address);

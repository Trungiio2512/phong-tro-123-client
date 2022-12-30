import React from "react";
import PropTypes from "prop-types";
import { Button, Item } from "../../components";

const List = (props) => {
    return (
        <div className="w-full  border border-gray-300 p-2 rounded-lg bg-white shadow-md">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Danh sach tin dang</h3>
                <span>cap nhat ngay 25-12-2022</span>
            </div>
            <div className="flex items-center gap-1">
                <span>Sap xep :</span>
                <Button text="Mặc định" bgColor={"bg-gray-200"} />
                <Button text="Mới nhất" bgColor={"bg-gray-200"} />
            </div>
            <div className="">
                {" "}
                <Item />
                {/* <Item />
                <Item /> */}
            </div>
        </div>
    );
};

List.propTypes = {};

export default List;

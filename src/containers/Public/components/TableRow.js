import React, { memo } from "react";
import PropTypes from "prop-types";
import { SkeletonCutom } from "../../../components";

const TableRow = ({ value, loading, label }) => {
    return (
        <tr>
            <td>{label}</td>
            <td>
                {loading ? (
                    <SkeletonCutom containerClassName="absolute top-[50%] w-[75%] -translate-y-[50%]" />
                ) : (
                    value
                )}
            </td>
        </tr>
    );
};

TableRow.propTypes = {
    value: PropTypes.string,
    loading: PropTypes.bool,
};

export default memo(TableRow);

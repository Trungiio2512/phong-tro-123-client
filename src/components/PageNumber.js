import React, { memo } from "react";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { createSearchParams, useNavigate } from "react-router-dom";

const defaultClassName = "w-[46px] h-[48px] flex text-sm bg-white rounded-md";
const active = "bg-secondary2 text-white";
const notActive = "hover:bg-gray-300";
const PageNumber = ({ currentPage, text, icon, morePage = false, setCurrentPage = () => {} }) => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const entries = searchParams.entries();

    const appendValueSearch = (entries) => {
        const params = {};

        searchParams.append("page", text);

        for (let [key, value] of entries) {
            params[key] = value;
        }
        return params;
    };

    const handleChangePage = () => {
        if (morePage) {
            return;
        }
        setCurrentPage(text);
        navigate({
            pathname: "/",
            search: `?${createSearchParams(appendValueSearch(entries))}`,
        });
    };

    return (
        <div
            className={`${defaultClassName} ${+text === Number(currentPage) ? active : notActive} ${
                !morePage ? "cursor-pointer" : "cursor-default select-none"
            }`}
            onClick={() => handleChangePage()}
        >
            <span className="m-auto">{icon || text}</span>
        </div>
    );
};

PageNumber.propTypes = {
    text: PropTypes.any,
    icon: PropTypes.object,
    setCurrentPage: PropTypes.func,
    currentPage: PropTypes.any,
    morePage: PropTypes.bool,
};

export default memo(PageNumber);

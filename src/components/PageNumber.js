import React, { memo } from "react";
import PropTypes from "prop-types";
import { useLocation, useSearchParams } from "react-router-dom";
import { createSearchParams, useNavigate } from "react-router-dom";

const defaultClassName = "w-[44px] h-[44px] flex text-sm bg-white rounded-md";
const active = "bg-secondary2 text-white";
const notActive = "hover:bg-gray-300";
const PageNumber = ({ currentPage, text, icon, morePage = false, setCurrentPage = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [searchParams, setSearchParams] = useSearchParams();
  const entries = searchParams.entries();

  const appendValueSearch = (entries) => {
    searchParams.append("page", text);

    const params = [];

    for (let entry of entries) {
      params.push(entry);
    }

    let searchQueryParams = {};

    params?.forEach((i) => {
      if (Object.keys(searchQueryParams)?.some((item) => item === i[0] && item !== "page")) {
        searchQueryParams[i[0]] = [...searchQueryParams[i[0]], i[1]];
      } else {
        searchQueryParams = { ...searchQueryParams, [i[0]]: [i[1]] };
      }
    });
    return searchQueryParams;
  };

  const handleChangePage = () => {
    if (morePage) {
      return;
    }
    setCurrentPage(text);
    navigate({
      pathname: location.pathname,
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

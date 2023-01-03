import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PageNumber } from "../../components";
import { useSelector } from "react-redux";
import icons from "../../untils/icons";
import { useSearchParams } from "react-router-dom";
const { TbPlayerTrackNext, TbPlayerTrackPrev } = icons;
const Panigation = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    const { count, posts } = useSelector((state) => state.post);

    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasFirstPage, setFirstPage] = useState(false);
    const [hasLastPage, setLastPage] = useState(false);

    // console.log(count, posts);
    // console.log(arrPage);

    useEffect(() => {
        const page = searchParams.get("page");
        page && +page !== currentPage && setCurrentPage(+page);
        !page && setCurrentPage(1);
    }, [currentPage, searchParams]);

    useEffect(() => {
        let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS);
        let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
        let start = currentPage - 1 <= 0 ? 1 : currentPage - 1;
        const temp = [];

        for (let i = start; i <= end; i++) {
            temp.push(i);
        }

        currentPage <= 2 ? setFirstPage(false) : setFirstPage(true);
        currentPage + 1 >= maxPage ? setLastPage(false) : setLastPage(true);

        setArrPage(temp);
    }, [count, currentPage]);

    return (
        <div className="flex items-center justify-center gap-2 mt-3 ">
            {hasFirstPage && (
                <>
                    <PageNumber
                        icon={<TbPlayerTrackPrev />}
                        text={1}
                        setCurrentPage={setCurrentPage}
                    />
                    <PageNumber text="..." morePage />
                </>
            )}
            {arrPage.length > 0 &&
                arrPage.map((i) => {
                    return (
                        <PageNumber
                            key={i}
                            text={i}
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                        />
                    );
                })}
            {hasLastPage && (
                <>
                    <PageNumber text="..." morePage />
                    <PageNumber
                        icon={<TbPlayerTrackNext />}
                        text={Math.floor(count / posts.length)}
                        setCurrentPage={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

Panigation.propTypes = {};

export default Panigation;

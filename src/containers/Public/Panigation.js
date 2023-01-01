import React, { useCallback, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { PageNumber } from "../../components";
import { useSelector } from "react-redux";
import icons from "../../untils/icons";
const { TbPlayerTrackNext, TbPlayerTrackPrev } = icons;
const Panigation = ({ number }) => {
    const { count, posts } = useSelector((state) => state.post);

    const [arrPage, setArrPage] = useState([]);
    const [currentPage, setCurrentPage] = useState(+number || 0);
    const [hasFirstPage, setFirstPage] = useState(false);
    const [hasLastPage, setLastPage] = useState(false);

    // console.log(count, posts);
    // console.log(arrPage);
    useEffect(() => {
        let maxPage = Math.floor(count / posts.length);
        let end = currentPage + 1 > maxPage ? maxPage : currentPage + 1;
        let start = currentPage - 1 <= 0 ? 0 : currentPage - 1;
        const temp = [];
        for (let i = start; i <= end; i++) {
            temp.push(i);
        }
        currentPage > 1 ? setFirstPage(true) : setFirstPage(false);
        currentPage >= maxPage - 1 ? setLastPage(false) : setLastPage(true);
        setArrPage(temp);
    }, [count, currentPage, posts.length]);
    return (
        <div className="flex items-center justify-center gap-2 mt-5">
            {hasFirstPage && (
                <>
                    <PageNumber
                        icon={<TbPlayerTrackPrev />}
                        text={0}
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

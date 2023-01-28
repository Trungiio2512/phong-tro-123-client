import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { ListItem } from "../../components";
import * as userServices from "../../services/user";

const LovePost = (props) => {
    const [loading, setloading] = useState(true);
    const [posts, setposts] = useState([]);
    useEffect(() => {
        setloading(true);
        const timer = setTimeout(async () => {
            const res = await userServices.apiGetLovePosts();
            if (res.err === 0) {
                setposts(res.data);
                setloading(false);
            }
        }, 3000);
        return () => {
            clearTimeout(timer);
        };
    }, []);
    return (
        <div className="w-full p-10">
            <ListItem posts={posts} loading={loading} counts={[1, 2, 3, 4, 5]} />
        </div>
    );
};

LovePost.propTypes = {};

export default LovePost;

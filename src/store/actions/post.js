import actionTypes from "./actionsType";
import { apiGetPosts, apiGetPostsLitmit } from "../../services/post";

export const getPosts = (payload) => async (dispatch) => {
    try {
        const res = await apiGetPosts();
        console.log(res);
        if (res?.err === 0) {
            dispatch({ type: actionTypes.GET_POSTS, data: res.data });
        } else {
            dispatch({ type: actionTypes.GET_POSTS, msg: res.data.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_POSTS, posts: null });
    }
};
export const getPostsLimit = (page) => async (dispatch) => {
    try {
        const res = await apiGetPostsLitmit(page);
        // console.log(res);
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                data: res?.data?.rows,
                count: res?.data?.count,
            });
        } else {
            dispatch({ type: actionTypes.GET_POSTS_LIMIT, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_POSTS_LIMIT, msg: error?.message });
    }
};

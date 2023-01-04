import actionTypes from "./actionsType";
import { apiGetNewPosts, apiGetPosts, apiGetPostsLitmit } from "../../services/post";

export const getPosts = (payload) => async (dispatch) => {
    try {
        const res = await apiGetPosts();
        // console.log(res);
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
export const getPostsLimit = (payload) => async (dispatch) => {
    try {
        const res = await apiGetPostsLitmit(payload);
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

export const getNewPosts = () => async (dispatch) => {
    try {
        const res = await apiGetNewPosts();
        // console.log(res);
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.GET_NEW_POSTS,
                data: res?.data,
            });
        } else {
            dispatch({ type: actionTypes.GET_NEW_POSTS, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_NEW_POSTS, msg: error?.message });
    }
};

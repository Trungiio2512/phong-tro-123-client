import actionTypes from "./actionsType";
import { apiGetPosts } from "../../services/post";

export const getPosts = (payload) => async (dispatch) => {
    try {
        const res = await apiGetPosts();
        console.log(res);
        if (res?.err === 0) {
            dispatch({ type: actionTypes.GET_POSTS, data: res.data });
        } else {
            dispatch({ type: actionTypes.REGISTER_FAILED, msg: res.data.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_POSTS, posts: null });
    }
};

import * as userService from "../../services/user";
import * as lovePostService from "../../services/lovePost";
import actionTypes from "./actionsType";

export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await userService.getCurrentUser();
        if (res?.err === 0) {
            dispatch({ type: actionTypes.GET_USER, data: res.data });
        } else {
            dispatch({ type: actionTypes.GET_USER_FAIL, msg: res.msg });
            dispatch({ type: actionTypes.LOGOUT });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_USER_FAIL, msg: error?.response });
        dispatch({ type: actionTypes.LOGOUT });
    }
};
export const getLovePost = () => async (dispatch) => {
    try {
        const res = await lovePostService.apiGetLovePost();
        // console.log(res);
        if (res?.err === 0) {
            dispatch({ type: actionTypes.GET_LOVE_POSTS, data: res.data });
        }
        // console.log(res);
    } catch (error) {
        console.log(error);
    }
};
export const deletedLovePost = (payload) => ({
    type: actionTypes.DELETE_LOVE_POST,
    data: payload,
});
export const addLovePost = (payload) => ({
    type: actionTypes.ADD_LOVE_POST,
    data: payload,
});

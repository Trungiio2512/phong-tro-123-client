import * as userService from "../../services/user";
import actionTypes from "./actionsType";

export const getCurrentUser = () => async (dispatch) => {
    try {
        const res = await userService.getCurrentUser();
        if (res?.err === 0) {
            dispatch({ type: actionTypes.GET_USER, data: res.data });
        } else {
            dispatch({ type: actionTypes.GET_USER_FAIL, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_USER_FAIL, msg: error?.response });
    }
};

import actionTypes from "./actionsType";
import { apiRegister } from "../../services/auth";

export const register = (payload) => async (dispatch) => {
    try {
        const res = await apiRegister(payload);
        console.log(res);
        if (res?.data.err === 0) {
            dispatch({ type: actionTypes.REGISTER_SUCCESS, data: res.data?.accessToken });
        } else {
            dispatch({ type: actionTypes.REGISTER_FAILED, data: res.data.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.REGISTER_FAILED, data: error });
    }
};

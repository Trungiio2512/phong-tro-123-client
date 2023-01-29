import actionTypes from "./actionsType";
import { apiLogin, apiRefresh, apiRegister } from "../../services/auth";

export const register = (payload) => ({ type: actionTypes.REGISTER, ...payload });

export const login = (payload) => ({
    type: actionTypes.LOGIN,
    ...payload,
});

export const logout = () => ({
    type: actionTypes.LOGOUT,
});

export const refresh = () => async (dispatch) => {
    try {
        const res = await apiRefresh();
        console.log(res);
    } catch (error) {
        console.log(error);
    }
};

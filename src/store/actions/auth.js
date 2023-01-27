import actionTypes from "./actionsType";
import { apiLogin, apiRegister } from "../../services/auth";

export const register = (payload) => ({ type: actionTypes.REGISTER, ...payload });

export const login = (payload) => ({
    type: actionTypes.LOGIN,
    ...payload,
});

export const logout = () => ({
    type: actionTypes.LOGOUT,
});

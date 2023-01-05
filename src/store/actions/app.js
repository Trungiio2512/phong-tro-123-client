import actionTypes from "./actionsType";
import * as apiCategory from "../../services/category";
import * as apiPrice from "../../services/price";
import * as apiArea from "../../services/area";
import * as apiProvince from "../../services/province";

export const getCategories = () => async (dispatch) => {
    try {
        const res = await apiCategory.apiGetCategories();
        if (res?.err === 0) {
            dispatch({ type: actionTypes.GET_CATEGORIES, data: res.data });
        } else {
            dispatch({ type: actionTypes.GET_CATEGORIES, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_CATEGORIES, data: null });
    }
};

export const getPrices = () => async (dispatch) => {
    try {
        const res = await apiPrice.getPrices();
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.GET_PRICES,
                data: res.data.sort((a, b) => +a?.order - +b?.order),
            });
        } else {
            dispatch({ type: actionTypes.GET_PRICES, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_PRICES, data: null });
    }
};

export const getAreas = () => async (dispatch) => {
    try {
        const res = await apiArea.getAreas();
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.GET_AREAS,
                data: res.data,
            });
        } else {
            dispatch({ type: actionTypes.GET_AREAS, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_AREAS, msg: error.message });
    }
};

export const getProvinces = () => async (dispatch) => {
    try {
        const res = await apiProvince.getProvinces();
        if (res?.err === 0) {
            dispatch({
                type: actionTypes.GET_PROVINCES,
                data: res.data.sort((a, b) => +a?.order - +b?.order),
            });
        } else {
            dispatch({ type: actionTypes.GET_PROVINCES, msg: res.msg });
        }
    } catch (error) {
        console.log(error);
        dispatch({ type: actionTypes.GET_PROVINCES, msg: error.message });
    }
};

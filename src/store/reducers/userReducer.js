import actionTypes from "../actions/actionsType";
const initialState = {
    currentData: {},
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_USER:
            return {
                ...state,
                currentData: action.data || {},
                msg: action.msg || "",
            };
        case actionTypes.GET_USER_FAIL:
            return {
                ...state,
                currentData: {},
                msg: action.msg || "",
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                currentData: {},
                msg: "",
            };
        default:
            return state;
    }
};
export default userReducer;

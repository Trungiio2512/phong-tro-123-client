import actionTypes from "../actions/actionsType";

const initialState = {
    isLogging: false,
    token: null,
    msg: "",
    update: false,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
        case actionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLogging: true,
                token: action.data,
                msg: "",
            };
        case actionTypes.REGISTER_FAILED:
        case actionTypes.LOGIN_FAILED:
            return {
                ...state,
                isLogging: false,
                msg: action.data,
                token: null,
                update: !state.update,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLogging: false,
                msg: "",
                token: null,
            };
        default:
            return state;
    }
};
export default authReducer;

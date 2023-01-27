import actionTypes from "../actions/actionsType";

const initialState = {
    isLogging: false,
    token: null,
    refreshToken: null,
    msg_login: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER:
        case actionTypes.LOGIN:
            return {
                ...state,
                isLogging: true,
                token: action.accessToken,
                refreshToken: action.refreshToken,
            };
        case actionTypes.LOGOUT:
            return {
                ...state,
                isLogging: false,
                token: null,
                refreshToken: null,
            };
        default:
            return state;
    }
};
export default authReducer;

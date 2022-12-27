import actionTypes from "../actions/actionsType";

const initialState = {
    isLogging: false,
    token: null,
    mess: "",
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.REGISTER_SUCCESS:
            return {
                ...state,
                isLogging: true,
                token: action.data,
            };
        case actionTypes.REGISTER_FAILED:
            return {
                ...state,
                isLogging: false,
                mess: action.data,
                token: null,
            };
        default:
            return state;
    }
};
export default authReducer;

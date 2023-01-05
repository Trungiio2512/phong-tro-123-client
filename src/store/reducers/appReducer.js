import actionTypes from "../actions/actionsType";
const initialState = {
    categories: [],
    prices: [],
    areas: [],
    provinces: [],
    msg: "",
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORIES:
            return {
                ...state,
                categories: action.data || [],
                msg: action.msg || "",
            };

        case actionTypes.GET_PRICES:
            return {
                ...state,
                prices: action.data || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_AREAS:
            return {
                ...state,
                areas: action.data || [],
                msg: action.msg || "",
            };
        case actionTypes.GET_PROVINCES:
            return {
                ...state,
                provinces: action.data || [],
                msg: action.msg || "",
            };
        default:
            return state;
    }
};

export default appReducer;

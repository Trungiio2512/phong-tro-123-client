import actionTypes from "../actions/actionsType";
const initialState = {
    currentData: {},
    posts: [],
    post: {},
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
        case actionTypes.GET_POSTS_PRIVATE:
            return {
                ...state,
                posts: action.data || [],
                msg: action.msg || "",
                // count: action.count || 0,
            };
        case actionTypes.EDIT_POSTS_PRIVATE:
            return {
                ...state,
                post: action.data || {},
            };
        case actionTypes.SET_DEFAULT_POSTS_PRIVATE:
            return {
                ...state,
                post: {},
            };
        default:
            return state;
    }
};
export default userReducer;

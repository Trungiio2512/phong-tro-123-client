import actionTypes from "../actions/actionsType";
const initialState = {
    posts: [],
    msg: "",
    count: 0,
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.data || [],
                msg: action.msg || "",
                count: action.count || 0,
            };
        default:
            return state;
    }
};

export default postReducer;

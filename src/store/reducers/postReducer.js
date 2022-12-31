import actionTypes from "../actions/actionsType";
const initialState = {
    posts: [],
    msg: "",
};

const postReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
            return {
                ...state,
                posts: action.data || [],
                msg: action.msg || "",
            };
        default:
            return state;
    }
};

export default postReducer;

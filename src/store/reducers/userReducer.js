import actionTypes from "../actions/actionsType";
const initialState = {
  currentData: {},
  posts: [],
  countPosts: 0,
  post: {},
  lovePosts: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER:
      return {
        ...state,
        currentData: action.data || {},
      };

    case actionTypes.GET_USER_FAIL:
      return {
        ...state,
        currentData: {},
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        currentData: {},
        posts: [],
        post: {},
        lovePosts: [],
        countPosts: 0,
      };
    case actionTypes.GET_POSTS_PRIVATE:
      return {
        ...state,
        posts: action.data || [],
        countPosts: action.count,
      };
    case actionTypes.EDIT_POSTS_PRIVATE:
      return {
        ...state,
        post: action.data || {},
        count: 0,
      };
    case actionTypes.SET_DEFAULT_POSTS_PRIVATE:
      return {
        ...state,
        post: {},
      };
    case actionTypes.GET_LOVE_POSTS:
      return {
        ...state,
        lovePosts: action.data || [],
      };
    case actionTypes.DELETE_LOVE_POST:
      return {
        ...state,
        lovePosts: action.data,
      };
    case actionTypes.ADD_LOVE_POST:
      return {
        ...state,
        lovePosts: [...state.lovePosts, action.data],
      };
    default:
      return state;
  }
};
export default userReducer;

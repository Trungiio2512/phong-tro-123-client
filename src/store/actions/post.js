import actionTypes from "./actionsType";
import * as postServices from "../../services/post";
import * as adminServices from "../../services/admin";
export const getPostsLimit = (payload) => async (dispatch) => {
  try {
    const res = await postServices.apiGetPostsLitmit(payload);
    // console.log(res);
    if (res?.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        data: res?.data?.rows,
        count: res?.data?.count,
      });
    } else {
      dispatch({ type: actionTypes.GET_POSTS_LIMIT, msg: res.msg });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.GET_POSTS_LIMIT, msg: error?.message });
  }
};

export const getPostsPrivate = (payload) => async (dispatch) => {
  try {
    let res;
    res = await postServices.apiGetPostsPrivate(payload);
    if (res?.err === 0) {
      dispatch({
        type: actionTypes.GET_POSTS_PRIVATE,
        data: res?.data?.rows,
        count: res?.data?.count,
      });
    } else {
      dispatch({ type: actionTypes.GET_POSTS_PRIVATE, msg: res.msg });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.GET_POSTS_PRIVATE, msg: error?.message });
  }
};

export const editPostPrivate = (payload) => {
  return {
    type: actionTypes.EDIT_POSTS_PRIVATE,
    data: payload,
  };
};

export const setDefaultPostPriveate = () => {
  return {
    type: actionTypes.SET_DEFAULT_POSTS_PRIVATE,
  };
};

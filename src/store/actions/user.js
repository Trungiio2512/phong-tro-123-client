import * as userService from "../../services/user";
import * as lovePostService from "../../services/lovePost";
import * as registerPostService from "../../services/registerPost";
import actionTypes from "./actionsType";

export const getCurrentUser = () => async (dispatch) => {
  try {
    const res = await userService.getCurrentUser();
    if (res?.err === 0) {
      dispatch({ type: actionTypes.GET_USER, data: res.data });
    } else {
      dispatch({ type: actionTypes.GET_USER, data: {} });
      dispatch({ type: actionTypes.LOGOUT });
    }
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.GET_USER, data: {} });
    dispatch({ type: actionTypes.LOGOUT });
  }
};
export const getLovePost = () => async (dispatch) => {
  try {
    const res = await lovePostService.apiGetLovePost();
    // console.log(res);
    if (res?.err === 0) {
      dispatch({ type: actionTypes.GET_LOVE_POSTS, data: res.data });
    } else {
      dispatch({ type: actionTypes.GET_LOVE_POSTS, data: [] });
    }
    // console.log(res);
  } catch (error) {
    console.log(error);
    dispatch({ type: actionTypes.GET_LOVE_POSTS, data: [] });
  }
};
export const deletedLovePost = (payload) => ({
  type: actionTypes.DELETE_LOVE_POST,
  data: payload,
});
export const addLovePost = (payload) => ({
  type: actionTypes.ADD_LOVE_POST,
  data: payload,
});
export const getRegisterPosts = () => async (dispatch) => {
  try {
    const res = await registerPostService.apiGetRegistersPosts();
    // console.log(res);
    if (res.err === 0) {
      dispatch({ type: actionTypes.GET_REGISTER_POSTS, data: res.data });
    } else {
      dispatch({ type: actionTypes.GET_REGISTER_POSTS, data: [] });
    }
  } catch (error) {
    // console.log(error);
    dispatch({ type: actionTypes.GET_REGISTER_POSTS, data: [] });
  }
};
export const deletedRegisterPost = (payload) => ({
  type: actionTypes.DELETE_REGISTER_POST,
  data: payload,
});
export const addRegisterPost = (payload) => ({
  type: actionTypes.ADD_REGISTER_POST,
  data: payload,
});

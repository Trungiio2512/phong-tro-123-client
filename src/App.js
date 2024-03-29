import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import jwt from "jwt-decode";
import { path } from "./untils/constant";
import {
  DetailPost,
  Home,
  HomePage,
  Login,
  NotFound,
  Register,
  Rentail,
  SearchDetail,
  NotSearch,
} from "./containers/Public";

import {
  Account,
  Admin,
  Contact,
  CreatePost,
  LovePost,
  ManagerCategory,
  ManagerPost,
  RegisterPost,
  Statistic,
  System,
  UserInfo,
  UsersRegisterPost,
} from "./containers/System";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
import { PrivateRoute, PrivateRouteAdmin } from "./containers/System/PrivateRoute";
import { formatVietnameseToString } from "./untils/common/fn";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { categories } = useSelector((state) => state.app);
  // const role = jwt(token)?.roleCode;
  // console.log(categories);
  useEffect(() => {
    const timoutGetInfoUser = setTimeout(async () => {
      if (token) {
        dispatch(actions.getCurrentUser());
        dispatch(actions.getLovePost());
        dispatch(actions.getRegisterPosts());
      }
    }, 1000);
    return () => clearTimeout(timoutGetInfoUser);
  }, [token]);

  useEffect(() => {
    dispatch(actions.getPrices());
    dispatch(actions.getAreas());
    dispatch(actions.getCategories());
    dispatch(actions.getProvinces());
  }, []);
  return (
    <div className="bg-primary">
      <Routes>
        <Route path={path.HOME} element={<Home />}>
          <Route index element={<HomePage />} />
          {categories.map((item) => {
            return (
              <Route
                key={item.code}
                path={formatVietnameseToString(item?.value)}
                element={<Rentail />}
              />
            );
          })}
          {/* <Route path={path.CHO_THUE_CAN_HO} element={<Rentail />} />
          <Route path={path.CHO_THUE_MAT_BANG} element={<Rentail />} />
          <Route path={path.CHO_THUE_PHONG_TRO} element={<Rentail />} />
          <Route path={path.NHA_CHO_THUE} element={<Rentail />} /> */}
          <Route path={path.SEARCH} element={<SearchDetail />} />
        </Route>
        <Route path={path.SYSTEM} element={<System />}>
          <Route
            index
            element={
              <div className="w-full">
                <h2>Chào mừng</h2>
              </div>
            }
          />
          <Route element={<PrivateRoute token={token} />}>
            <Route path={path.CREATE_POST} element={<CreatePost />} />
            <Route path={path.MANAGER_POST} element={<ManagerPost token={token} />} />
            <Route path={path.USERS_REGISTER_POST} element={<UsersRegisterPost />} />
            <Route path={`${path.UPDATE_POST}/:id`} element={<CreatePost />} />
          </Route>
          <Route path={path.USER_INFO} element={<UserInfo />} />
          <Route path={path.LOVE_POST} element={<LovePost />} />
          <Route path={path.REGISTER_POST} element={<RegisterPost />} />
        </Route>
        <Route element={<PrivateRouteAdmin token={token} />}>
          <Route path={path.ADMIN} element={<Admin />}>
            <Route
              index
              element={
                <div className="w-full">
                  <h2>Chào mừng đến với quản trị viên</h2>
                </div>
              }
            />
            <Route path={path.STATISTIC} element={<Statistic />} />
            <Route path={path.ACCOUNT} element={<Account />} />
            <Route path={path.MANAGER_POST} element={<ManagerPost admin />} />
            <Route path={path.MANAGER_CATEGORY} element={<ManagerCategory />} />
            <Route path={path.CREATE_POST} element={<CreatePost admin />} />
          </Route>
        </Route>
        <Route element={<NotSearch />}>
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
        </Route>
        <Route path={path.NOTFOUND} element={<NotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;

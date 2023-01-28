import { Routes, Route } from "react-router-dom";
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

import { Contact, CreatePost, LovePost, ManagerPost, System, UserInfo } from "./containers/System";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "./store/actions";
// import { apiGetLovePost } from "./services/lovePost";
// import moment from "moment";

function App() {
    const { token } = useSelector((state) => state.auth);
    const { lovePosts } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const timoutGetInfoUser = setTimeout(async () => {
            if (token) {
                dispatch(actions.getCurrentUser());
                dispatch(actions.getLovePost());
            }
        }, 1000);
        return () => clearTimeout(timoutGetInfoUser);
    }, [token]);
    console.log(lovePosts);

    useEffect(() => {
        // [["page", 5], ["pageSize", 25]]
        dispatch(actions.getPrices());
        dispatch(actions.getAreas());
        // dispatch(actions.getNewPosts());
        dispatch(actions.getProvinces());
    }, []);
    return (
        <div className="bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route index element={<HomePage />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rentail />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rentail />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rentail />} />
                    <Route path={path.NHA_CHO_THUE} element={<Rentail />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />
                </Route>
                <Route path={path.SYSTEM} element={<System />}>
                    <Route path={path.CREATE_POST} element={<CreatePost />} />
                    <Route path={path.MANAGER_POST} element={<ManagerPost />} />
                    <Route path={path.USER_INFO} element={<UserInfo />} />
                    <Route path={path.LOVE_POST} element={<LovePost />} />
                </Route>
                <Route element={<NotSearch />}>
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.REGISTER} element={<Register />} />
                    <Route path={path.CONTACT} element={<Contact />} />
                    <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
                </Route>
                <Route path={path.NOTFOUND} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

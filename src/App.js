import { Routes, Route } from "react-router-dom";
import { path } from "./untils/constant";
import {
    DetailPost,
    Home,
    HomePage,
    Login,
    NotFound,
    Rentail,
    SearchDetail,
} from "./containers/Public";

import { CreatePost, System } from "./containers/System";
function App() {
    return (
        <div className="bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path={path.HOME__PAGE} element={<HomePage />} /> */}
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<Rentail />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<Rentail />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<Rentail />} />
                    <Route path={path.NHA_CHO_THUE} element={<Rentail />} />
                    <Route path={path.SEARCH} element={<SearchDetail />} />

                    <Route path={"chi-tiet/*"} element={<DetailPost />} />
                    <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
                </Route>
                <Route path={path.SYSTEM} element={<System />}>
                    <Route path={path.CREATE_POST} element={<CreatePost />} />
                </Route>
                <Route path={path.NOTFOUND} element={<NotFound />} />
            </Routes>
        </div>
    );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { path } from "./untils/constant";
import { DetailPost, Home, HomePage, Login, Rentail, SearchDetail } from "./containers/Public";
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

                    <Route path={"detail/*"} element={<DetailPost />} />
                    <Route path={path.DETAIL_POST__TITLE__POSTID} element={<DetailPost />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

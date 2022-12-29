import { Routes, Route } from "react-router-dom";
import { path } from "./untils/constant";
import {
    Home,
    HomePage,
    Login,
    RentailApartment,
    RentailHouse,
    RentailRoom,
} from "./containers/Public";
import RentailScpace from "./containers/Public/RentailScpace";
function App() {
    return (
        <div className="bg-primary">
            <Routes>
                <Route path={path.HOME} element={<Home />}>
                    <Route path={"*"} element={<HomePage />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.CHO_THUE_CAN_HO} element={<RentailApartment />} />
                    <Route path={path.CHO_THUE_MAT_BANG} element={<RentailScpace />} />
                    <Route path={path.CHO_THUE_PHONG_TRO} element={<RentailRoom />} />
                    <Route path={path.NHA_CHO_THUE} element={<RentailHouse />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;

import { Outlet, useLocation } from "react-router-dom";
import { Contact, Intro, Navigation } from "../../components";
import { Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { path } from "../../untils/constant";
function NotSearch() {
    // const dispatch = useDispatch();
    const location = useLocation();
    // const { isLogging, token } = useSelector((state) => state.auth);
    // console.log(location.pathname);
    return (
        <div className="w-full flex flex-col items-center h-fulj gap-3">
            <Header />
            <Navigation />

            <div className="w-4/5 flex flex-col mt-3 ">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    );
}

export default NotSearch;

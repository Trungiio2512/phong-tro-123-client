import { Outlet } from "react-router-dom";
import { Contact, Intro, Navigation } from "../../components";
import { Search, Header } from "./components";
import { useDispatch, useSelector } from "react-redux";
function Home() {
    const dispatch = useDispatch();

    const { isLogging, token } = useSelector((state) => state.auth);

    return (
        <div className="w-full flex flex-col items-center h-fulj gap-3">
            <Header />
            <Navigation />
            {isLogging && <Search />}

            <div className="w-4/5 flex flex-col mt-3 ">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    );
}

export default Home;

import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navigation from "./Navigation";
function Home() {
    return (
        <div className="w-full flex flex-col items-center h-full">
            <Header />
            <Navigation />
            <div className="w-4/5 flex flex-col mt-3 ">
                <Outlet />
            </div>
        </div>
    );
}

export default Home;

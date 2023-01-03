import { Outlet } from "react-router-dom";
import { Contact, Intro } from "../../components";
import { Search, Navigation, Header } from "./index";
function Home() {
    return (
        <div className="w-full flex flex-col items-center h-fulj gap-3">
            <Header />
            <Navigation />
            <Search />

            <div className="w-4/5 flex flex-col mt-3 ">
                <Outlet />
            </div>
            <Intro />
            <Contact />
        </div>
    );
}

export default Home;

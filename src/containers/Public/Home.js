import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Intro, Navigation } from "../../components";
import { Search, Header } from "./components";
function Home() {
    const navRef = useRef();
    useEffect(() => {
        // console.log(navRef.current);
        const handleScroll = (e) => {
            // console.log(window.pageYOffset);
            if (window.pageYOffset > 85) {
                // console.log(navRef.current);
                navRef.current.style = `
                    position: fixed;
                    top : 0;
                    right : 0;
                    left : 0;
                    z-index:10;`;
            } else {
                navRef.current.style = ``;
            }
            // console.log(window.pageYOffset);
        };
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <div className="w-full flex flex-col items-center h-fulj gap-3">
            <Header />
            <div ref={navRef} className="w-full">
                <Navigation />
            </div>
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

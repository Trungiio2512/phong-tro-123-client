import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Contact, Intro, Navigation } from "../../components";
import { Search, Header } from "./components";
function Home() {
  const navRef = useRef();
  // useEffect(() => {
  //     // console.log(navRef.current);
  //     const handleScroll = (e) => {
  //         // console.log(window.pageYOffset);
  //         if (window.pageYOffset > 85) {
  //             // console.log(navRef.current);
  //             navRef.current.style = `
  //                 position: fixed;
  //                 top : 0;
  //                 right : 0;
  //                 left : 0;
  //                 z-index:10;`;
  //         } else {
  //             navRef.current.style = ``;
  //         }
  //         // console.log(window.pageYOffset);
  //     };
  //     window.addEventListener("scroll", handleScroll);

  //     return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //     };
  // }, []);
  return (
    <div className="w-full flex flex-col items-center h-full gap-3 md:max-w-7xl mx-auto sm:px-4 px-2">
      <Header />
      <Navigation />
      <Search />

      <div className="flex flex-col mt-3 max-w-[1000px]">
        <Outlet />
      </div>
      <Intro />
      <Contact />
    </div>
  );
}

export default Home;

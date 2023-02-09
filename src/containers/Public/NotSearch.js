import { Outlet } from "react-router-dom";
import { Contact, Intro, Navigation } from "../../components";
import { Header } from "./components";
import { useEffect, useRef } from "react";
function NotSearch() {
  const navRef = useRef();

  return (
    <div className="w-full flex flex-col items-center h-full gap-3 md:max-w-7xl mx-auto sm:px-4 px-2">
      <Header />
      <Navigation />
      <div className="w-full flex flex-col mt-3 ">
        <Outlet />
      </div>
      <Intro />
      <Contact />
    </div>
  );
}

export default NotSearch;

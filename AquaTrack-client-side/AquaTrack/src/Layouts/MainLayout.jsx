import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet, useLocation } from "react-router";
import TeamMember from "../Components/TeamMember";
import Footer from "../Components/Footer";
import GridBackgroundView from "../Components/MovingGrid";
import Marquee from "../Components/Marquee";
import MiniNavBar from "../Components/MiniNavBar";

const MainLayout = () => {
  const location = useLocation();
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-10">
        <GridBackgroundView />
      </div>
      <header>{location.pathname === "/" ? <Navbar /> : <MiniNavBar />}</header>

      <main className="max-w-9xl flex flex-col items-center justify-between">
        {location.pathname === "/" && <Marquee />}
        {location.pathname === "/" && <TeamMember />}
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default MainLayout;

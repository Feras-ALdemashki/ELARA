import React from "react";
import { Outlet } from "react-router-dom"; // <-- import Outlet
import Header from "./Header";
import SideMenu from "./SideMenu";

const Layout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideMenu />

      {/* Main content */}
      <div className="flex flex-col flex-1">
        <Header />

        {/* This is where child routes will render */}
        <main className="p-4 flex-1 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

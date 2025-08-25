import { Outlet } from "react-router-dom";

import Header from "./Header";

const Layout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 p-4 overflow-y-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;

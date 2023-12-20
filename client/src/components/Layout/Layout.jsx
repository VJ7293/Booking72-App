import React from "react";
import Header from "../header/header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    // <div className="py-4 px-8 flex flex-col border-gradient-tr from-bizluru3 to-bizluru4   bg-secondary">
    <div className="py-4 px-4 ">
      {/* bg-gradient-to-tr from-bizluru2 to-bizluru1 */}
      <Header />
      {/* <AccountPage /> */}

      <Outlet />
    </div>
  );
};

export default Layout;

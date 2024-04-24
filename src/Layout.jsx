import React from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";

const Layout = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;

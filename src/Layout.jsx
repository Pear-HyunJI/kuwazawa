import React, { useState } from "react";
import LeftHeader from "@/components/layout/LeftHeader";
import RightHeader from "@/components/layout/RightHeader";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div>
      <RightHeader isOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
      <LeftHeader
        isOpen={isMenuOpen}
        toggleMenu={toggleMenu}
        handleCloseMenu={handleCloseMenu}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

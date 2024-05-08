import React, { useState } from "react";
import styled from "styled-components";
import LeftHeader from "@/components/layout/LeftHeader";
import RightHeader from "@/components/layout/RightHeader";
import MHeader from "@/components/layout/MHeader";
import { Outlet } from "react-router-dom";
import Footer from "@/components/layout/Footer";
import { useMediaQuery } from "react-responsive";

const LayoutBlock = styled.div``;

const Layout = () => {
  const mobile = useMediaQuery({ maxWidth: 412 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <LayoutBlock>
      {mobile || (
        <div className="header">
          <RightHeader isOpen={isMenuOpen} handleCloseMenu={handleCloseMenu} />
          <LeftHeader
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            handleCloseMenu={handleCloseMenu}
          />
        </div>
      )}
      {mobile && (
        <>
          <MHeader
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            handleCloseMenu={handleCloseMenu}
          />
        </>
      )}
      <main>
        <Outlet />
      </main>
      <Footer />
    </LayoutBlock>
  );
};

export default Layout;

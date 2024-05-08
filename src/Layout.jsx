import React, { useState } from "react";
import styled from "styled-components";
import LeftHeader from "@/components/layout/LeftHeader";
import RightHeader from "@/components/layout/RightHeader";
import { Outlet } from "react-router-dom";
import MHeader from "@/components/layout/MHeader";
import Footer from "@/components/layout/Footer";
import { useMediaQuery } from "react-responsive";

const LayoutBlock = styled.div``;

const MainBlur = styled.div`
  filter: ${(props) => (props.isMenuOpen ? "blur(5px)" : "none")};
  background-color: ${(props) => props.isMenuOpen && "#f5eeda90"};
`;

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
      <div className="header">
        {mobile ? (
          <MHeader
            isOpen={isMenuOpen}
            toggleMenu={toggleMenu}
            handleCloseMenu={handleCloseMenu}
          />
        ) : (
          <>
            <RightHeader
              isOpen={isMenuOpen}
              handleCloseMenu={handleCloseMenu}
            />
            <LeftHeader
              isOpen={isMenuOpen}
              toggleMenu={toggleMenu}
              handleCloseMenu={handleCloseMenu}
            />
          </>
        )}
      </div>
      <MainBlur isMenuOpen={isMenuOpen}>
        <Outlet />
        <Footer />
      </MainBlur>
    </LayoutBlock>
  );
};

export default Layout;

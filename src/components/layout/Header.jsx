import React from "react";
import styled from "styled-components";
import LeftHeader from "../header/LeftHeader";
import RightHeader from "../header/RightHeader";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: transparent;
  position: fixed;
  width: 100%;
  z-index: 500;
  padding: 10px; /* 필요에 따라 조절 */
`;

const Header = () => {
  return (
    <Container>
      <LeftHeader />
      <RightHeader />
    </Container>
  );
};

export default Header;
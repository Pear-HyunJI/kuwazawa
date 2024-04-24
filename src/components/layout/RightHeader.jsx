import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const RightHeaderBlock = styled.div`
  font-sizw: 20px;
  font-weight: bold;
  writing-mode: vertical-lr;
  position: fixed;
  z-index: 500;
  right: 0px;
  padding: 50px;
  z-index: 1000;
  color: ${(props) => (props.isOpen ? "#fff" : "#5a4620")};
  transition: color 0.3s ease;
`;

const rightHeader = ({ isOpen }) => {
  return (
    <RightHeaderBlock isOpen={isOpen}>
      <div>
        <Link to="/">쿠와자와 과자점</Link>
      </div>
    </RightHeaderBlock>
  );
};

export default rightHeader;

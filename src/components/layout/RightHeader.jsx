import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import logo from "../../assets/image/logo_img1b.svg";

const RightHeaderBlock = styled.div`
  font-size: 20px; /* 오타 수정 */
  font-weight: bold;
  writing-mode: vertical-lr;
  position: fixed;
  right: 0px;
  padding: 50px;
  z-index: 1000;
  color: ${(props) => (props.isOpen ? "#fff" : "#5a4620")};
  transition: color 0.3s ease;

  img {
    width: 30px;
    vertical-align: middle;
    margin-right: 8px;
    margin-bottom:10px;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const RightHeader = ({ isOpen, handleCloseMenu }) => {
  return (
    <RightHeaderBlock isOpen={isOpen}>
      <Link to="/" onClick={handleCloseMenu}>
        <img src={logo} alt="logo" />
        <span>쿠와자와 과자점</span> {/* 텍스트를 감싸기 위해 span 추가 */}
      </Link>
    </RightHeaderBlock>
  );
};

export default RightHeader;
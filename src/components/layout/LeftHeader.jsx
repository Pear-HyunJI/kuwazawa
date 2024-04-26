import React, { useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";

const LeftHeaderBlock = styled.div`
  position: fixed;
  z-index: 500;
  left: 0px;
  background-color: ${(props) => (props.isOpen ? "#5a462080;" : "none")};
  transition: color 0.3s ease;
  .nav {
    padding: 50px 50px;
    .menuButton {
      button {
        background: none;
        font-size: 30px;
        padding-bottom: 10px;
        color: ${(props) => (props.isOpen ? "#fff" : "#5a4620")};
        transition: color 0.3s ease;
      }
      .cart {
        font-size: 30px;
        color: ${(props) => (props.isOpen ? "#fff" : "#5a4620")};
        transition: color 0.3s ease;
      }
    }

    .menu {
      width: 100vw;
      height: 100vh;
      color: #fff;
      ul {
        font-size: 20px;
        position: absolute;
        top: 25%;
        left: 30%;
        li {
          border: 1px solid #green;
          margin-bottom: 20px;
          .member {
            display: flex;
          }
        }
      }
    }
  }
`;

const leftHeader = ({ isOpen, toggleMenu }) => {
  return (
    <LeftHeaderBlock isOpen={isOpen}>
      <div className="nav">
        <div className="menuButton">
          <button onClick={toggleMenu}>
            {isOpen ? <IoCloseOutline /> : <CiMenuBurger />}
          </button>
          <div className="cart">
            <Link to='/cart'>
            <BsCart4 />
            </Link>
          </div>
        </div>
        {isOpen && (
          <div className="menu">
            <ul>
              <li className="member">
                <Link to="/login">로그인&nbsp;&nbsp;</Link> |
                <Link to="/join">&nbsp;&nbsp;회원가입</Link>
              </li>
              <li>
                <NavLink to="/storeInfo">점포 소개</NavLink>
              </li>
              <li>
                <NavLink to="/snackInfo">과자 소개</NavLink>
              </li>
              <li>
                <NavLink to="/itemList">온라인 과자점</NavLink>
              </li>
              <li>
                <NavLink to="/board">공지사항</NavLink>
              </li>
            </ul>
          </div>
        )}
      </div>
    </LeftHeaderBlock>
  );
};

export default leftHeader;

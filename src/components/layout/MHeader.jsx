import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "@/store/product";
import { userLogout, userLogin } from "@/store/member";
import {
  FaDiceOne,
  FaDiceTwo,
  FaDiceThree,
  FaDiceFour,
  FaDiceFive,
  FaDiceSix,
} from "react-icons/fa";

const MHeaderBlock = styled.div`
  color: #5a4620;
  border: 1px solid red;
  position: fixed;
  z-index: 500;
  top: 0px;
  left: 0px;
  width: 100%;
  background-color: ${(props) => (props.isOpen ? "#5a462090;" : "none")};
  transition: all 0.3s ease;
  .nav {
    border: 1px solid yellow;

    width: 100%;
    .menuButton {
      display: flex;
      justify-content: space-between;
      button {
        border: 1px solid red;
        background: none;
        font-size: 30px;
        padding-bottom: 10px;
        transition: color 0.3s ease;
      }
      .logo {
        border: 1px solid red;
        align-items: center;
        text-align: center;
      }
      .cartNdice {
        display: flex;
        .cart {
          margin: auto;
          font-size: 30px;
          transition: color 0.3s ease;
          // position: absolute;
          position: relative;
          span {
            position: absolute;
            top: -2px;
            right: 25px;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: none;
            border: 1px solid;
            border-color: ${(props) => (props.isOpen ? "#fff" : "#5a4620")};
            font-size: 12px;
            line-height: 20px;
            text-align: center;
            font-weight: bold;
          }
        }
        .dice {
          border: 1px solid green;
          margin-top: 15px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
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
`;

const MHeader = ({ isOpen, toggleMenu, handleCloseMenu }) => {
  const dispatch = useDispatch();
  const carts = useSelector((state) => state.products.carts);
  const user = useSelector((state) => state.members.user);
  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    alert("로그아웃 되었습니다.");
  };
  useEffect(() => {
    dispatch(fetchProducts());
    let loging = localStorage.loging;
    if (loging) {
      dispatch(userLogin(JSON.parse(loging)));
    }
  }, [dispatch]);

  //주사위 돌리기

  const [dice, setDice] = useState(0);

  const rollDice = () => {
    const randomNumber = Math.trunc(Math.random() * 6) + 1;
    setDice(randomNumber);
  };

  useEffect(() => {
    rollDice();
  }, []);

  return (
    <MHeaderBlock isOpen={isOpen}>
      <div className="nav">
        <div className="menuButton">
          <button onClick={toggleMenu}>
            {isOpen ? <IoCloseOutline /> : <CiMenuBurger />}
          </button>

          <div className="logo">
            <Link to="/" onClick={handleCloseMenu}>
              쿠와자와 과자점
            </Link>
          </div>
          <div className="cartNdice">
            <div className="cart">
              <Link to="/cart" onClick={handleCloseMenu}>
                <BsCart4 />
                <span>{carts ? carts.length : 0}</span>
              </Link>
            </div>
            <div className="dice">
              {dice !== null && (
                <>
                  {dice === 1 && <FaDiceOne />}
                  {dice === 2 && <FaDiceTwo />}
                  {dice === 3 && <FaDiceThree />}
                  {dice === 4 && <FaDiceFour />}
                  {dice === 5 && <FaDiceFive />}
                  {dice === 6 && <FaDiceSix />}
                </>
              )}
              <button
                className="diceBtn"
                onClick={rollDice}
                style={{
                  padding: "5px",
                  fontSize: "14px",
                  background: "rgba(255,255,255,0.3)",
                  borderRadius: "10px",
                }}
              >
                Roll dice
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="menu">
          <ul>
            {user ? (
              <li className="member">
                <a href="#" onClick={handleLogout}>
                  로그아웃&nbsp;&nbsp;
                </a>{" "}
                |
                <Link to="/" onClick={handleCloseMenu}>
                  &nbsp;&nbsp;정보수정({user.userId})
                </Link>
              </li>
            ) : (
              <li className="member">
                <Link to="/login" onClick={handleCloseMenu}>
                  로그인&nbsp;&nbsp;
                </Link>{" "}
                |
                <Link to="/join" onClick={handleCloseMenu}>
                  &nbsp;&nbsp;회원가입
                </Link>
              </li>
            )}
            <li>
              <NavLink to="/storeInfo" onClick={handleCloseMenu}>
                점포 소개
              </NavLink>
            </li>
            <li>
              <NavLink to="/snackInfo" onClick={handleCloseMenu}>
                과자 소개
              </NavLink>
            </li>
            <li>
              <NavLink to="/product" onClick={handleCloseMenu}>
                온라인 과자점
              </NavLink>
            </li>
            <li>
              <NavLink to="/board" onClick={handleCloseMenu}>
                공지사항
              </NavLink>
            </li>
            <li>
              <NavLink to="/game" onClick={handleCloseMenu}>
                게임
              </NavLink>
            </li>
          </ul>
        </div>
      )}
    </MHeaderBlock>
  );
};

export default MHeader;

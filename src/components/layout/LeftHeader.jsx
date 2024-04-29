import React, {useEffect} from "react";
import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";
import { CiMenuBurger } from "react-icons/ci";
import { IoCloseOutline } from "react-icons/io5";
import { BsCart4 } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/product'
import { userLogout, userLogin } from '@/store/member'

const LeftHeaderBlock = styled.div`
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0px;
  background-color: ${(props) => (props.isOpen ? "#5a462090;" : "none")};
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
        position: absolute;
        span {
          position: absolute;
          top: -2px;
          right: -5px;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: none;
          border: 1px solid ;
          border-color :${(props) => (props.isOpen ? "#fff" : "#5a4620")};
          color:  ${(props) => (props.isOpen ? "#fff" : "#5a4620")};
          font-size: 12px;
          line-height: 20px;
          text-align: center;
          font-weight: bold;
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
  }
`

const LeftHeader = ({ isOpen, toggleMenu, handleCloseMenu }) => {
    const dispatch = useDispatch()
    const carts = useSelector(state=>state.products.carts)
    const user = useSelector(state=>state.members.user)
    const handleLogout = (e)=>{
      e.preventDefault()
      dispatch(userLogout())
      alert("로그아웃 되었습니다.")
    }
    useEffect(()=>{
      dispatch(fetchProducts())
      let loging = localStorage.loging
      if (loging) {
        dispatch(userLogin(JSON.parse(loging)))
      }
    }, [dispatch])
  return (
    <LeftHeaderBlock isOpen={isOpen}>
      <div className="nav">
        <div className="menuButton">
          <button onClick={toggleMenu}>
            {isOpen ? <IoCloseOutline /> : <CiMenuBurger />}
          </button>
          <div className="cart">
            <Link to="/cart">
              <BsCart4 />
              <span>{ carts ? carts.length : 0 }</span>
            </Link>
          </div>
        </div>
        {isOpen && (
          <div className="menu">
            <ul>
            { user ?
             <li className="member">
              <a href="#" onClick={handleLogout}>로그아웃&nbsp;&nbsp;</a>{" "}
              |
              <Link to="/" onClick={handleCloseMenu}>&nbsp;&nbsp;정보수정({user.userId})</Link>
              </li>
                :
              <li className="member">
                <Link to="/login" onClick={handleCloseMenu}>
                  로그인&nbsp;&nbsp;
                </Link>{" "}
                |
                <Link to="/join" onClick={handleCloseMenu}>
                  &nbsp;&nbsp;회원가입
                </Link>
              </li>
              }
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
            </ul>
          </div>
        )}
      </div>
    </LeftHeaderBlock>
  );
};

export default LeftHeader;

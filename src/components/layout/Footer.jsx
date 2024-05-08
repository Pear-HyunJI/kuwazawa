import React from "react";
import styled from "styled-components";
import logo from "../../assets/image/logo_img1b.svg";
import footer1 from "../../assets/image/homeSnack/footer_img1.png";
import footer2 from "../../assets/image/homeSnack/footer_img2.png";
import { Link } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";

const FooterBlock = styled.div`
  background: transparent;
  .footer {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 150px;
    padding-bottom: 60px;
  }
  .footerTop {
    padding: 150px 0;
    width: 150px;
  }
  .goToLink {
    display: flex;
    align-items: center;
    position: relative;
  }
  .footerImg1 {
    opacity: 1;
    transition: all 1s ease;
    position: absolute;
    bottom: 40px;
  }
  .footerImg2 {
    opacity: 0;
    position: absolute;
    bottom: 40px;
  }
  .footerTop:hover .footerImg1 {
    opacity: 0;
  }
  .footerTop:hover .footerImg2 {
    opacity: 1;
  }
  .topLine {
    color: #5a4620;
    position: absolute;
    bottom: 0px;
    text-align: center;
    width: 100%;
    font-weight: bold;
  }
  .botLine {
    color: #5a4620;
    position: absolute;
    bottom: -30px;
    text-align: center;
    width: 100%;
  }
  .footerBottom{
    display:flex;
  }
  p {
    color: #5a4620;
    padding:5px;
  }
  span{
    color: #5a4620;
    padding:5px;
  }
  button {
    background: transparent;
    color: #5a4620;
    border: 1px solid #5a4620;
    padding: 10px 80px;
    border-radius: 30px;
    transition: all 0.5s ease;
    cursor: pointer;
    margin-right: 20px;
    font-size: 1rem;

    &:hover {
      background: #5a4620;
      color: #fff;
    }
  }
  .right a {
    color: #5a4620;
    font-size: 1.5rem;
    margin: 0 10px;
  }
  .right p {
    color: #5a4620;
    font-size: 0.8rem;
    margin: 0;
  }

  @media (max-width: 768px) {
    background: transparent;
    .footer {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 150px;
      padding-bottom: 60px;
    }
    .footerTop {
      padding: 150px 0;
      width: 150px;
    }
    .goToLink {
      display: flex;
      align-items: center;
      position: relative;
    }
    .footerImg1 {
      opacity: 1;
      transition: all 1s ease;
      position: absolute;
      bottom: 40px;
    }
    .footerImg2 {
      opacity: 0;
      position: absolute;
      bottom: 40px;
    }
    .footerTop:hover .footerImg1 {
      opacity: 0;
    }
    .footerTop:hover .footerImg2 {
      opacity: 1;
    }
    .topLine {
      color: #5a4620;
      position: absolute;
      bottom: 0px;
      text-align: center;
      width: 100%;
      font-weight: bold;
    }
    .botLine {
      color: #5a4620;
      position: absolute;
      bottom: -30px;
      text-align: center;
      width: 100%;
    }
    .footerBottom{
      display:block;
    }
    .footerLogo{
      display:block;
      margin-left:155px;
    }
    p {
      color: #5a4620;
      padding:5px;
      text-aling:center;
    }
    span{
      color: #5a4620;
      padding:5px;
      display:block;
      text-align:center;
    }
    button {
      background: transparent;
      color: #5a4620;
      border: 1px solid #5a4620;
      padding: 10px 80px;
      border-radius: 30px;
      transition: all 0.5s ease;
      cursor: pointer;
      margin-right: 20px;
      font-size: 1rem;
  
      &:hover {
        background: #5a4620;
        color: #fff;
      }
    }
    .right button{
      margin-left:100px;
    }
    .right a {
      color: #5a4620;
      font-size: 1.5rem;
      margin: 0 10px;
      text-align:center;
    }
    .right p {
      color: #5a4620;
      font-size: 0.8rem;
      margin: 0;
      text-align:center;
    }
    .footerYear{
      padding-right:50px;
    }
    .right:{
    tex-align:center;
    }
`;


const Footer = () => {
  return (
    <FooterBlock className="row">
      <div className="footer">
        <div className="footerTop">
          <Link to="/product" className="goToLink">
            <img src={footer1} alt="" className="footerImg footerImg1"/>
            <img src={footer2} alt="" className="footerImg footerImg2" />
            <p className="topLine">온라인 상점</p>
            <p className="botLine">ONLINE SHOP</p>
          </Link>
        </div>
        <div className="footerBottom">
          <img src={logo} alt=""  style={{marginRight:"15px"}} className="footerLogo"  />
          <div className="left">
            <div className="title">
              <p style={{textAlign:"center"}}><strong>쿠와자와</strong></p>
            </div>
            <div className="info">
              <div className="time">
                <span>영업시간/AM8:00 ~ PM18:30 </span>
                <span>정기휴일 /수요일(공휴일 이외)</span>
              </div>
              <div className="tel">
                <span>TEL.0247-26-2851</span>
                <span>FAX.0247-26-8511</span>
              </div>
              <p>
                963-7808 후쿠시마현 이시카와군 이시카와초 후타리자 신주 20-1
              </p>
            </div>
          </div>
          <div className="right">
            <button>문의</button>
            <Link>
              <FaInstagram />
            </Link>
            <p style={{ paddingLeft: "50px", paddingTop: "40px" }} className="footerYear">2022 년 okashinokuwazawa</p>
          </div>
        </div>
      </div>
    </FooterBlock>
  );
};

export default Footer;

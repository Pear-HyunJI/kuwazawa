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
  p {
    color: #5a4620;
  }
  button {
    background: transparent;
    color: #5a4620;
    border: 1px solid #5a4620;
    padding: 10px 80px;
    border-radius: 30px;
    transition: all 0.5s ease;
  }
  button:hover {
    background: #5a4620;
    color: #fff;
  }
  .footerBottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .left {
    flex: 1;
    text-align: left;
  }

  .title p {
    color: #5a4620;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .info p {
    color: #5a4620;
    font-size: 1rem;
    margin-bottom: 5px;
  }

  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  button {
    background-color: #5a4620;
    color: #fff;
    border: none;
    padding: 12px 30px;
    border-radius: 30px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
    margin-right: 20px;

    &:hover {
      background-color: #48390f;
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
`;

const Footer = () => {
  return (
    <FooterBlock className="row">
      <div className="footer">
        <div className="footerTop">
          <Link to="/product" className="goToLink">
            <img src={footer1} alt="" className="footerImg footerImg1" />
            <img src={footer2} alt="" className="footerImg footerImg2" />
            <p className="topLine">온라인 상점</p>
            <p className="botLine">ONLINE SHOP</p>
          </Link>
        </div>
        <div className="footerBottom">
          <img src={logo} alt="" />
          <div className="left">
            <div className="title">
              <p>쿠와자와</p>
            </div>
            <div className="info">
              <div className="time">
                <p>영업시간/AM8:00 ~ PM18:30 </p>
                <p>정기휴일 /수요일(공휴일 이외)</p>
              </div>
              <div className="tel">
                <p>TEL.0247-26-2851</p>
                <p>FAX.0247-26-8511</p>
              </div>
              <p>
                〒963-7808 후쿠시마현 이시카와군 이시카와초 후타리자 신주 20-1
              </p>
            </div>
          </div>
          <div className="right">
            <button>문의</button>
            <Link>
              <FaInstagram />
            </Link>
            <p>2022 년 okashinokuwazawa</p>
          </div>
        </div>
      </div>
    </FooterBlock>
  );
};

export default Footer;

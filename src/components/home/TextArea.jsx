import React, { useState, useEffect } from "react";
import styled from "styled-components";
import _ from "lodash";
import { Link } from "react-router-dom";

const TextAreaBlock = styled.div`
  text-align: center;
  margin: 400px auto 200px;
  .container {
    height: 1150px;
    font-size: 168px;
    color: #000;
    background: transparent;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h3{
    font-size: 45px;
  }
  .cream {
    z-index: 50;
  }
  .and {
    z-index: 48;
  }
  .paste {
    z-index: 50;
  }
  .imgBox {
    width: 250px;
    overflow: hidden;
    position: sticky;
    top: 40vh;
    z-index: 49;
  }
  .bottom {
    font-size: 22px;
    color: #333;
    margin: 60px;
  }
  .btn {
    font-size: 20px;
    background: transparent;
    padding: 10px;
    border: none;
    outline: none;
    position: relative;
    overflow: hidden;
    transition: all 0.5s ease;
    cursor: pointer;
    border-top: 5px solid #5a4620;
    width: fit-content;
    max-width: 200px;
    margin: 50px;
    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 50%;
      width: 100%;
      height: 100%;
      background: #5a4620;
      transition: all 0.5s ease;
      z-index: -1;
      transform: translateX(-50%) scaleY(0);
      transform-origin: center top;
      color: #fff;
    }
    &:hover:after {
      transform: translateX(-50%);
    }
    &:hover {
      color: #fff;
      width: 120%;
    }
  }
  @media screen and (max-width: 412px) {
    margin: 300px auto 200px;
    .container {
      height: 930px;
      font-size: 130px;
    }

    .imgBox {
      width: 200px;
    }
    .bottom {
      font-size: 22px;
      color: #333;
      margin: 40px;
      word-break: keep-all;
    }
  }
`;

const TextArea = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const threshold = 5400;

  useEffect(() => {
    const handleScroll = _.throttle(() => {
      setScrollPosition(window.scrollY || window.pageYOffset);
    }, 200);

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition > threshold) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % product.length);
    }
  }, [scrollPosition, threshold]);

  const product = [
    { img: "./assets/image/advertise/batadorayaki_img2.jpg" },
    { img: "./assets/image/advertise/home_img17.jpg" },
    { img: "./assets/image/advertise/home_img19.jpg" },
    { img: "./assets/image/advertise/jonamagashi_img4.jpg" },
  ];

  return (
    <TextAreaBlock className="row">
      <div className="container">
      <h3>전통과 정성</h3>
        <div className="imgBox">
          <img src={product[currentImageIndex].img} alt="" />
        </div>

        <div className="cream">
          <p>传统</p>
        </div>
        <div className="and">
          <p>与</p>
        </div>
        <div className="paste">
          <p>真诚</p>
        </div>
      </div>
      <div className="bottom">
         <br />
        <p>후쿠시마현 이시카와초에 있는 창업 메이지 20년의 화과자점 입니다 .</p>
        <p>
          창업 당시부터 변함없는 맛의 차, 만주, 도랴야끼에 생크림 샌드. 인기의
          화과자 장인이 색채를 더하는 계절의 화과자 등 . 수제로만든 맛있는
          느낌을 즐기세요 .
        </p>
        <button className="btn"><Link to="/storeInfo">View More</Link></button>
      </div>
    </TextAreaBlock>
  );
};

export default TextArea;

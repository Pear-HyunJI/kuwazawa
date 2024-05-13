import React from "react";
import styled, { keyframes } from "styled-components";
import { useMediaQuery } from "react-responsive";

const shaking = keyframes`
  0%, 100% {
    transform: rotate(0);
    transform-origin: left bottom;
  }

  22% {
    transform: rotate(5.5deg);
    transform-origin: right bottom;
  }

  44% {
    transform: rotate(-5.5deg);
    transform-origin: left bottom;
  }

  66% {
    transform: rotate(2deg);
    transform-origin: right bottom;
  }

  77% {
    transform: rotate(-1deg);
    transform-origin: left bottom;
  }

  88% {
    transform: rotate(.9375deg);
    transform-origin: right bottom;
  }
`;

const GameTopBlock = styled.div`
  padding: 50px 0;
  max-width: 1500px;
  margin: 0 auto;
  @media screen and (max-width: 412px) {
    padding: 80px 0 20px;
  }

  .imgBox {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .slide {
      width: 80px;
      img {
        width: 100%;
      }
    }
    .slide:nth-child(5) {
      animation: ${shaking} 4.5s infinite ease-in-out forwards;
      width: 130px;
    }
  }

  .mobileTop {
    display: flex;
    align-items: center;
    flex-direction: column;
    h2 {
      font-size: 30px;
      color: #5a4620;
      margin-bottom: 52px;
      z-index: 1;
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 125%;
        left: 50%;
        transform: translateX(-50%);
        width: 0.3px;
        height: 35px;
        background-color: #504532;
        opacity: 1;
      }
    }
    img {
      z-index: 0;
      width: 100px;
      animation: ${shaking} 5s infinite ease-in-out forwards;
    }
  }
`;

const GameTop = () => {
  const mobile = useMediaQuery({ maxWidth: 412 });
  const moveImage = [
    { src: "/assets/image/slide1/slide_img11.png", alt: "보름달" },
    { src: "/assets/image/slide1/slide_img10.png", alt: "백안과생초코" },
    { src: "/assets/image/slide1/slide_img9.png", alt: "사과나무" },
    { src: "/assets/image/slide1/slide_img2.png", alt: "구운도넛" },
    { src: "/assets/image/slide1/slide_img7.png", alt: "쿠와도라" },
    { src: "/assets/image/slide1/slide_img3.png", alt: "귤의언덕" },
    { src: "/assets/image/slide1/slide_img8.png", alt: "화과자" },
    { src: "/assets/image/slide1/slide_img6.png", alt: "카스텔라" },
    { src: "/assets/image/slide1/slide_img4.png", alt: "도라야키" },
  ];

  return (
    <GameTopBlock>
      {mobile ? (
        <div className="mobileTop">
          <h2>쿠와도라 게임</h2>
          <img src="/assets/image/slide1/slide_img7.png" alt="쿠와도라" />
        </div>
      ) : (
        <div className="imgBox">
          {moveImage.map((item, index) => (
            <div className="slide" key={index}>
              <img src={item.src} alt={item.alt} />
            </div>
          ))}
        </div>
      )}
    </GameTopBlock>
  );
};

export default GameTop;

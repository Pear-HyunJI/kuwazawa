import React from "react";
import styled, { keyframes } from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const shaking = keyframes`
  0%, 100% {
    transform: rotate(0);
    transform-origin: left bottom;
  }

  22% {
    transform: rotate(7.5deg);
    transform-origin: right bottom;
  }

  44% {
    transform: rotate(-7.5deg);
    transform-origin: left bottom;
  }

  66% {
    transform: rotate(3.75deg);
    transform-origin: right bottom;
  }

  77% {
    transform: rotate(-1.875deg);
    transform-origin: left bottom;
  }

  88% {
    transform: rotate(.9375deg);
    transform-origin: right bottom;
  }
`;

const MainSliderBlock = styled.div`
  position: relative;
  margin-top: 4100px;
  width: 100vw;
  border: 1px solid red;
  display: flex;
  flex-direction: column;
  .slick-track {
    margin-top: 410px;
    align-items: center;
    text-align: center;
    flex: 1;
    .slide {
      img {
        width: 160px;
        //transform: scale(1);
        //transition: transform 0.5s ease-in-out;
        animation: ${shaking} 4.5s infinite ease-in-out forwards;
      }
    }

    .slick-center {
      img {
        width: 240px;
        // transform: scale(1.5);
        //transition: transform 0.5s ease-in-out;
      }
    }
  }
  .text {
    margin-top: 100px;
    flex: 1;
    color: #5a4620;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    span {
      font-size: 30px;
      line-height: 70px;
      letter-spacing: 10px;
      writing-mode: vertical-lr;
      left: 50%;
    }
  }

  //  {
  //   span {
  //     color: #5a4620;
  //     writing-mode: vertical-lr;
  //   }
  //   // span {
  //   //   font-size: 30px;
  //   //   line-height: 70px;
  //   //   font-weight: 600;
  //   //   letter-spacing: 10px;
  //   //   writing-mode: vertical-rl;
  //   //   position: absolute;
  //   //   color: #5a4620;
  //   //   writing-mode: vertical-lr;
  //   //   left: 50%;
  //   //   transform: translateX(-50%);
  //   // }
  // }
`;

const MainSlider = () => {
  const options = {
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    beforeChange: (next) => {
      const slideItems = document.querySelectorAll(".slide");
      slideItems.forEach((item, index) => {
        if (index === next) {
          item.classList.add("slick-center");
        } else {
          item.classList.remove("slick-center");
        }
      });
    },
  };

  const sliders = [
    { src: "./assets/image/slide1/slide_img1.png", alt: "과자1" },
    { src: "./assets/image/slide1/slide_img2.png", alt: "과자2" },
    { src: "./assets/image/slide1/slide_img3.png", alt: "과자3" },
    { src: "./assets/image/slide1/slide_img4.png", alt: "과자4" },
    { src: "./assets/image/slide1/slide_img5.png", alt: "과자5" },
    { src: "./assets/image/slide1/slide_img6.png", alt: "과자7" },
    { src: "./assets/image/slide1/slide_img8.png", alt: "과자8" },
    { src: "./assets/image/slide1/slide_img9.png", alt: "과자9" },
    { src: "./assets/image/slide1/slide_img10.png", alt: "과자10" },
    { src: "./assets/image/slide1/slide_img11.png", alt: "과자11" },
    { src: "./assets/image/slide1/slide_img12.png", alt: "과자12" },
  ];

  return (
    <MainSliderBlock>
      <div className="text">
        <span>오늘은。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span>과자를 먹는、</span>
      </div>
      <Slider className="slider" {...options}>
        {sliders.map((item, index) => (
          <div className="slide" key={index}>
            <img src={item.src} alt={item.alt} />
          </div>
        ))}
      </Slider>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
      <div>늘리기</div>
    </MainSliderBlock>
  );
};

export default MainSlider;

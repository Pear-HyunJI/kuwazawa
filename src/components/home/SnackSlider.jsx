import React from "react";
import styled, { keyframes } from "styled-components";
import { useHorizontalScroll } from "@/components/layout/UseHorizontalScroll";
import { Link } from "react-router-dom";

const hoverLine = keyframes`
   0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  49.9% {
    opacity: 0;
    transform: translateX(-99%);
  }
  50% {
    opacity: 1;
    transform: translateX(0%);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
`;

const Container = styled.div`
  ::-webkit-scrollbar {
    display: none;
  }
  position: relative;
  padding: 50px 0 300px 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #5a462099;
  .animal {
    position: absolute;
    top: 79%;
    right: 5%;
  }
  .flower {
    position: absolute;
    width: 30%;
    top: 0%;
    left: 0%;
  }
  h2 {
    text-align: center;
    color: #5a4620;
    font-size: 45px;
    margin-bottom: 100px;
  }
  @media screen and (max-width: 412px) {
    padding: 20px 0 200px 0;
    .animal {
      top: 70%;
    }
    .flower {
      width: 60%;
      left: -20%;
      z-index: 0;
    }
    h2 {
      font-size: 40px;
      z-index: 1;
    }
  }
`;

const SliderWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 120px;

  .slide {
    positon: relative;
    border: 2px solid #5a4620;
    border-radius: 30px;
    flex: 0 0 30%;
    height: 600px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    margin: 0px 20px;
    background: url("./assets/image/fadein/3_bg1_pc-252c0289.webp");
    background-size: cover;
    h3 {
      color: #5a4620;
      font-size: 30px;
    }
    img {
      z-index: 2;
      width: 250px;
      margin: 40px 0;
    }
    .desc {
      text-align: center;
      color: #5a4620;
      margin-bottom: 30px;
      p {
        padding: 4px;
      }
    }
    a {
      margin-right: 50px;
      color: #5a4620;
      font-weight: bold;
      position: relative;
      &::before {
        overflow: hidden;
        content: "";
        position: absolute;
        height: 1px;
        width: 100%;
        top: 50%;
        left: 110%;
        background-color: #5a4620;
      }
      &:hover::before {
        animation: ${hoverLine} 1.5s infinite;
        visibility: visible;
      }
    }
  }
  @media screen and (max-width: 412px) {
    padding: 0px 50px;
    .slide {
      flex: 0 0 100%;
      // width: 300px;
      height: 400px;
      padding: 0 10px;
      margin: 0px 20px;
      h3 {
        font-size: 25px;
      }
      img {
        width: 150px;
        margin: 20px 0 20px 0;
      }
      .desc {
        margin-bottom: 20px;
      }
    }
  }
`;

const SnackSlider = () => {
  const sliderRef = useHorizontalScroll();

  const sliders = [
    {
      name: "쿠와도라",
      img: "./assets/image/homeSnack/home_img1.png",
      desc1: "푹신한 빵과 직접 만든 으깬 팥소、",
      desc2: "안에 프리미엄 생크림。",
      desc3: "행복한 샌드의 신명물。",
    },
    {
      name: "화과자",
      img: "./assets/image/homeSnack/flower_cake.png",
      desc1: "계절의 상차림을 한 일본의 전통과자。",
      desc2: "오늘 하루도、",
      desc3: "화과자의 아름다움을 즐겨。",
    },
    {
      name: "차만주",
      img: "./assets/image/homeSnack/manjoo.png",
      desc1: "직접 만든 단팥을 맛보길。",
      desc2: "꾸준히 사랑받는 갈색의",
      desc3: "변함없는 맛의 차만주。",
    },
    {
      name: "귤의언덕",
      img: "./assets/image/homeSnack/home_img8.png",
      desc1: "상큼하고 달콤한 귤의 맛을 구운 과자로、",
      desc2: "촉촉하게 구워낸 반족 속에도",
      desc3: "귤이 들어있어요。",
    },
    {
      name: "버터 도라야키",
      img: "./assets/image/homeSnack/dorayaki.png",
      desc1: "스테디셀러인 도라야키에 하나 더、",
      desc2: "감칠맛 나는 진한 버터를",
      desc3: "한 번 발라 더 깊은 맛으로。",
    },
  ];

  return (
    <Container>
      <img
        className="flower"
        src="./assets/image/fadein/7_border2_pc-d89d5f5f.webp"
        alt="flower"
      />
      <img
        className="animal"
        src="./assets/image/fadein/1_squirrel_pc-32d0e05a.png"
        alt="flower"
      />
      <h2>대표 메뉴</h2>
      <SliderWrapper ref={sliderRef}>
        {sliders.map((item, index) => (
          <div key={index} className="slide">
            <h3>{item.name}</h3>
            <img src={item.img} alt={item.name} />
            <div className="desc">
              <p>{item.desc1}</p>
              <p>{item.desc2}</p>
              <p>{item.desc3}</p>
            </div>
            <Link to="/snackInfo">자세히</Link>
          </div>
        ))}
      </SliderWrapper>
    </Container>
  );
};

export default SnackSlider;

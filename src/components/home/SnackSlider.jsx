import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import { useHorizontalScroll } from "@/components/layout/UseHorizontalScroll";
import { Link } from "react-router-dom";

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Song+Myung&display=swap');
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: hidden;
  background: #5a462099;
`;

const SliderWrapper = styled.div`
  border: 1px solid pink;
  display: flex;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  padding: 0 150px;
  .slide {
    border: 1px solid red;
    border-radius: 30px;
    flex: 0 0 25%;
    height: 600px;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 50px;
    margin: 20px;
    background-color: #fffbf2;
    h3 {
      font-family: "Song Myung", serif;
    }
    img {
      width: 250px;
      margin: 20px 0;
    }
    .desc {
      text-align: center;
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
      img: "./assets/image/homeSnack/tangerine.png",
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
      <h2>대표 과자</h2>
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

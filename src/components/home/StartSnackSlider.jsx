import React from "react";
import styled from "styled-components";

const StartSnackSliderBlock = styled.div`
  height: 130vh;
  position: relative;
  overflow: hidden;
  .snack {
    position: absolute;
    width: 150px;
    left: 50%;
    top: ${({ circlePosition }) => `calc(30% + ${circlePosition}px)`};
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .circle {
    position: absolute;
    left: 50%;
    top: ${({ circlePosition }) => `calc(30% + ${circlePosition}px)`};
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #5a462099;
    transition: width 0.5s, height 0.5s; // 크기 변경 애니메이션 추가
  }
`;

const StartSnackSlider = ({ scrollPosition }) => {
  const startScroll = 7750; // 시작 스크롤 위치
  const endScroll = 8200; // 끝 스크롤 위치
  const maxSize = 2500; // 최대 크기
  const minSize = 200; // 최소 크기
  const minCirclePosition = 0; // 최소 circle 상대 위치
  const maxCirclePosition = 100; // 최대 circle 상대 위치

  let newCircleSize = minSize;
  let circlePosition = minCirclePosition;

  if (scrollPosition >= startScroll && scrollPosition <= endScroll) {
    newCircleSize =
      minSize +
      ((scrollPosition - startScroll) / (endScroll - startScroll)) *
        (maxSize - minSize);
    newCircleSize = Math.min(maxSize, Math.max(minSize, newCircleSize)); // 최소값과 최대값 사이의 값으로 제한
    circlePosition = minCirclePosition;
  } else if (scrollPosition > endScroll) {
    newCircleSize = maxSize;
    circlePosition = maxCirclePosition; // 최대 위치로 설정
  }

  return (
    <StartSnackSliderBlock circlePosition={circlePosition}>
      <div className="snack">
        <img src="./assets/image/homeSnack/home_img1.png" alt="화과자" />
      </div>
      <div
        className="circle"
        style={{
          width: `${newCircleSize}px`,
          height: `${newCircleSize}px`,
        }}
      ></div>
    </StartSnackSliderBlock>
  );
};

export default StartSnackSlider;

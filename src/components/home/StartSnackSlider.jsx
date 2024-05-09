import React from "react";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";

const StartSnackSliderBlock = styled.div`
  height: ${({ mobile }) =>
    mobile ? "110vh" : "130vh"}; /* 화면 크기에 따라 높이 조절 */
  position: relative;
  overflow: hidden;
  .snack {
    position: absolute;
    width: 150px;
    left: 50%;
    top: ${({ mobile }) =>
      mobile ? "20%" : "30%"}; /* 모바일 화면일 때 위치 조절 */
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  .circle {
    position: absolute;
    left: 50%;
    top: ${({ mobile }) =>
      mobile ? "20%" : "30%"}; /* 모바일 화면일 때 위치 조절 */
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #5a462099;
    transition: width 0.5s, height 0.5s; // 크기 변경 애니메이션 추가
  }
  @media screen and (max-width: 412px) {
  }
`;

const StartSnackSlider = ({ scrollPosition }) => {
  const mobile = useMediaQuery({ maxWidth: 412 }); // 모바일
  const startScroll = mobile ? 7250 : 7750; // 시작 스크롤 위치
  const endScroll = 8200; // 끝 스크롤 위치
  const maxSize = 2600; // 최대 크기
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
    <StartSnackSliderBlock mobile={mobile}>
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

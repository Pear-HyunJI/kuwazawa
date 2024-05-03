import React from "react";
import styled, { keyframes } from "styled-components";

const hoverLine = keyframes`
   0% {
    opacity: 0;
    transform: translateY(100%);
  }

  49.9% {
    opacity: 0;
    transform: translateY(99%);
  }
  50% {
    opacity: 1;
    transform: translateY(0%);
  }
  100% {
    opacity: 0;
    transform: translateY(100%);
  }
`;

const SnackTagBlock = styled.div`
  max-width: 900px;
  margin: auto;
  display: flex;
  justify-content: space-around;
  button {
    font-weight: bold;
    color: #504532;
    // padding: 20px;
    height: 150px;
    width: 110px;
    background: none;
    position: relative;
    font-size: 20px;
    overflow: hidden;
    &::before {
      content: "";
      position: absolute;
      top: 70%;
      left: 50%;
      transform: translateX(-50%);
      width: 0.3px;
      height: 35px;
      background-color: #504532;
      opacity: 1;
    }
    &:hover::before {
      animation: ${hoverLine} 1.5s infinite;
      visibility: visible;
    }
  }
`;

const SnackTag = ({ onButtonClick }) => {
  const handleClick = (pageIndex) => {
    onButtonClick(pageIndex);
  };

  return (
    <SnackTagBlock>
      <button onClick={() => handleClick(0)}>도넛류</button>
      <button onClick={() => handleClick(6)}>과자류</button>
      <button onClick={() => handleClick(12)}>빵류</button>
      <button onClick={() => handleClick(18)}>디저트류</button>
    </SnackTagBlock>
  );
};

export default SnackTag;

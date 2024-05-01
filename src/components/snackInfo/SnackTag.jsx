import React from "react";
import styled from "styled-components";

const SnackTagBlock = styled.div`
  button {
    padding: 20px;
    border: 1px solid red;
  }
`;

const SnackTag = ({ onButtonClick }) => {
  const handleClick = (pageIndex) => {
    onButtonClick(pageIndex);
  };

  return (
    <SnackTagBlock>
      <button onClick={() => handleClick(0)}>도넛</button>
      <button onClick={() => handleClick(3)}>과자</button>
      <button onClick={() => handleClick(6)}>빵</button>
      <button onClick={() => handleClick(9)}>디저트</button>
    </SnackTagBlock>
  );
};

export default SnackTag;

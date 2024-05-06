import React, { useState } from "react";
import styled from "styled-components";

const OvenContainer = styled.div`
  display: flex;
  justify-content: space-around;
`;

const OvenItem = styled.div`
  width: 100px;
  height: 50px;
  background-color: ${({ color }) => color};
  cursor: pointer;
`;

const OvenSelector = ({ onSelectOven }) => {
  const [isOvenSelected, setIsOvenSelected] = useState(false);

  const handleOvenSelect = (oven) => {
    setIsOvenSelected(true);
    onSelectOven(oven);
  };

  return (
    <div>
      <h2>오븐/찜기 선택</h2>
      <OvenContainer>
        <OvenItem color="#f39c12" onClick={() => handleOvenSelect("오븐")}>
          오븐
        </OvenItem>
        <OvenItem color="#c0392b" onClick={() => handleOvenSelect("찜기")}>
          찜기
        </OvenItem>
      </OvenContainer>
      {isOvenSelected && <p>결과가 나오는 애니메이션</p>}
    </div>
  );
};

export default OvenSelector;

import React from "react";
import styled from "styled-components";

const ResultContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ResultArea = ({
  selectedFlour,
  selectedFilling,
  selectedFlavor,
  selectedOven,
}) => {
  const selectedCombination = `${selectedFlour ? selectedFlour.label : ""}+${
    selectedFilling ? selectedFilling.label : ""
  }+${selectedFlavor ? selectedFlavor.label : ""}+${
    selectedOven ? selectedOven.label : ""
  }`;

  const getSnackFromCombination = (combination) => {
    switch (combination) {
      case "Flour+Chocolate+Fruit+Oven":
        return "초코 과일 케이크";
      case "Flour+RedBeans+Ginger+Steamer":
        return "팥앙금 찜빵";
      default:
        return "조합에 맞는 과자가 없습니다.";
    }
  };

  return (
    <ResultContainer>
      <h2>결과</h2>
      <p>선택한 과자: {getSnackFromCombination(selectedCombination)}</p>
    </ResultContainer>
  );
};

export default ResultArea;

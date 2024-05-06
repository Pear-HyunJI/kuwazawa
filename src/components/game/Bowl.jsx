import React, { useEffect } from "react";
import styled from "styled-components";

const BowlContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 2px dashed #ccc;
  margin: 20px auto;
`;

const Bowl = ({ selectedIngredients, onSelectComplete }) => {
  useEffect(() => {
    const isComplete = selectedIngredients.every(
      (ingredient) => ingredient !== null
    );
    if (isComplete) {
      onSelectComplete();
    }
  }, [selectedIngredients, onSelectComplete]);

  return (
    <BowlContainer>
      {selectedIngredients.map((ingredient, index) => (
        <div key={index}>{ingredient ? ingredient.label : ""}</div>
      ))}
    </BowlContainer>
  );
};

export default Bowl;

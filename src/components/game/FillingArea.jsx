import React from "react";
import styled from "styled-components";
import Ingredient from "@/components/game/Ingredient";

const FillingContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const FillingArea = ({ onSelectIngredient }) => {
  const ingredients = [
    { name: "초콜릿", color: "brown" },
    { name: "팥앙금", color: "red" },
    { name: "백앙금", color: "white" },
  ];

  return (
    <div>
      <h2>속재료구역</h2>
      <FillingContainer>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.name}
            name={ingredient.name}
            color={ingredient.color}
            onSelectIngredient={onSelectIngredient}
          />
        ))}
      </FillingContainer>
    </div>
  );
};

export default FillingArea;

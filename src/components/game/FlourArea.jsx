import React from "react";
import styled from "styled-components";
import Ingredient from "@/components/game/Ingredient";

const FlourContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const FlourArea = ({ onSelectIngredient }) => {
  const ingredients = [
    { name: "찹쌀가루", color: "beige" },
    { name: "박력분", color: "lightgray" },
    { name: "강력분", color: "gray" },
  ];

  return (
    <div>
      <h2>가루구역</h2>
      <FlourContainer>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.name}
            name={ingredient.name}
            color={ingredient.color}
            onSelectIngredient={onSelectIngredient}
          />
        ))}
      </FlourContainer>
    </div>
  );
};

export default FlourArea;

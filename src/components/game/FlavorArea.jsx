import React from "react";
import styled from "styled-components";
import Ingredient from "@/components/game/Ingredient";

const FlavorContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
`;

const FlavorArea = ({ onSelectIngredient }) => {
  const ingredients = [
    { name: "버터", color: "yellow" },
    { name: "과일", color: "green" },
  ];

  return (
    <div>
      <h2>풍미구역</h2>
      <FlavorContainer>
        {ingredients.map((ingredient) => (
          <Ingredient
            key={ingredient.name}
            name={ingredient.name}
            color={ingredient.color}
            onSelectIngredient={onSelectIngredient}
          />
        ))}
      </FlavorContainer>
    </div>
  );
};

export default FlavorArea;

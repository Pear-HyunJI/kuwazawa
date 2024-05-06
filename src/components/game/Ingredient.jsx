import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Matter from "matter-js";

const IngredientContainer = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ color }) => color};
  margin: 10px;
  cursor: pointer;
`;

const Ingredient = ({ name, color, onSelectIngredient }) => {
  const ingredientRef = useRef(null);

  useEffect(() => {
    const { Bodies, World } = Matter; // Matter에서 World도 가져옵니다.
    const { width, height, x, y } =
      ingredientRef.current.getBoundingClientRect();
    const body = Bodies.rectangle(
      x + width / 2,
      y + height / 2,
      width,
      height,
      { isStatic: true }
    );

    onSelectIngredient(name, body);

    // return () => {
    //   World.remove(world, body);
    // };
  }, []);

  return (
    <IngredientContainer
      ref={ingredientRef}
      color={color}
    ></IngredientContainer>
  );
};

export default Ingredient;

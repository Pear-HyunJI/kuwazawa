import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Matter from "matter-js";
import FlourArea from "@/components/game/FlourArea";
import FillingArea from "@/components/game/FillingArea";
import FlavorArea from "@/components/game/FlavorArea";
import OvenSelector from "@/components/game/OvenSelector";
import Bowl from "@/components/game/Bowl";
import ResultArea from "@/components/game/ResultArea";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [selectedFlour, setSelectedFlour] = useState(null);
  const [selectedFilling, setSelectedFilling] = useState(null);
  const [selectedFlavor, setSelectedFlavor] = useState(null);
  const [selectedOven, setSelectedOven] = useState(null);
  const [engine] = useState(Matter.Engine.create());
  const [isBowlFilled, setIsBowlFilled] = useState(false);

  const handleIngredientSelect = (name, body) => {
    Matter.World.add(engine.world, body);
    switch (name) {
      case "Flour":
        setSelectedFlour({ label: "Flour", body });
        break;
      case "Filling":
        setSelectedFilling({ label: "Filling", body });
        break;
      case "Flavor":
        setSelectedFlavor({ label: "Flavor", body });
        break;
      default:
        break;
    }
  };

  const handleBowlComplete = () => {
    setIsBowlFilled(true);
  };

  return (
    <AppContainer>
      <FlourArea onSelectIngredient={handleIngredientSelect} />
      <FillingArea onSelectIngredient={handleIngredientSelect} />
      <FlavorArea onSelectIngredient={handleIngredientSelect} />
      <OvenSelector onSelectOven={setSelectedOven} />

      <Bowl
        selectedIngredients={[selectedFlour, selectedFilling, selectedFlavor]}
        onSelectComplete={handleBowlComplete}
      />
      <ResultArea
        selectedFlour={selectedFlour}
        selectedFilling={selectedFilling}
        selectedFlavor={selectedFlavor}
        selectedOven={selectedOven}
      />
    </AppContainer>
  );
};

export default App;

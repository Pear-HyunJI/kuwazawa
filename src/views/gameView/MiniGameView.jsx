import React from "react";
import MiniGame from "@/components/game/MiniGame";
import MobileMiniGame from "@/components/game/MobileMiniGame";
import InfoMiniGame from "@/components/game/InfoMiniGame";
import GameTop from "@/components/game/GameTop";
import ReactDOM from "react-dom";
import { useMediaQuery } from "react-responsive";
import styled from "styled-components";

const MiniGameViewBlock = styled.div`
  .gameView {
    max-width: 1600px;
    margin: auto;
    display: flex;
    justify-content: space-around;
  }
`;

const MiniGameView = () => {
  const mobile = useMediaQuery({ maxWidth: 412 });
  return (
    <MiniGameViewBlock>
      <GameTop />
      {mobile ? (
        <div>
          <MobileMiniGame />
        </div>
      ) : (
        <div className="gameView">
          <InfoMiniGame />
          <MiniGame />
        </div>
      )}
    </MiniGameViewBlock>
  );
};

// ReactDOM.render(<MiniGameView />, document.getElementById("root"));
export default MiniGameView;

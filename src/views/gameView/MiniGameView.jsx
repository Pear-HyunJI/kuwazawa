import React from "react";
import MiniGame from "@/components/game/MiniGame";
import ReactDOM from "react-dom";

const MiniGameView = () => {
  return (
    <div>
      <MiniGame />
    </div>
  );
};

ReactDOM.render(<MiniGameView />, document.getElementById("root"));
export default MiniGameView;

import React from "react";
import styled from "styled-components";
import BoardSection from "../../components/board/BoardSection";



const BoardViewBlock = styled.div``;

const BoardView = () => {
  return <BoardViewBlock className="row">
    <BoardSection />
  </BoardViewBlock>;
};

export default BoardView;

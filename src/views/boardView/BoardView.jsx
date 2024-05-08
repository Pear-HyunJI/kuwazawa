import React, { useState } from "react";
import styled from "styled-components";
import BoardSection from "@/components/board/BoardSection";
import BoardCategory from "@/components/board/BoardCategory";
import BoardSearch from "@/components/board/BoardSearch";

const BoardViewBlock = styled.div``;

const BoardView = () => {
  const [title, setTitle] = useState("all");
  const [boardKeyword, setBoardKeyword] = useState("");

  const changeTitle = (value) => {
    setTitle(value);
  };

  const onBoardSearch = (keyword) => {
    setBoardKeyword(keyword);
  };

  return (
    <BoardViewBlock className="row">
      <BoardSearch onBoardSearch={onBoardSearch} />
      <BoardCategory changeTitle={changeTitle} title={title} />
      <BoardSection title={title} boardKeyword={boardKeyword} />
    </BoardViewBlock>
  );
};

export default BoardView;

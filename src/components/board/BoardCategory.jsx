import React from "react";
import styled from "styled-components";

const BoardCategoryBlock = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 20px 10px;
  button {
    border-radius: 5px;
    font-size: 16px;
    padding: 10px;
    margin: 0 10px;
    &.on {
      background-color: #5a4620;
      color: #fff;
    }
  }
`;

const BoardCategory = ({ changeTitle, title }) => {
  const category = ["all", "notice", "event", "update", "service"];
  return (
    <BoardCategoryBlock>
      {category.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => changeTitle(item)}
          className={title == item && "on"}
        >
          {item}
        </button>
      ))}
    </BoardCategoryBlock>
  );
};

export default BoardCategory;

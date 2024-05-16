import React, { useState } from "react";
import styled from "styled-components";
import { IoSearch } from "react-icons/io5";

const BoardSearchBlock = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 100px 0 20px;
  text-align: center;
  @media screen and (max-width: 412px) {
    padding: 100px 0 0px;
  }

  h2 {
    font-size: 35px;
    color: #5a4620;
    margin-bottom: 80px;
  }
  .searchWrap {
    display: flex;
    justify-content: flex-end;
    margin-right: 15px;
    input {
      border: 2px solid #5a462020;
      box-shadow: 0 0 1rem #5a462020;
      font-size: 12px;
      padding: 10px 40px 10px 10px;
      border-radius: 8px;
      max-width: 300px;
      margin-right: 10px;
    }
    button {
      color: #5a4620;
      font-size: 15px;
      font-weight: bold;
      padding: 5px 0px;
      background-color: transparent;
    }
    @media screen and (max-width: 412px) {
      justify-content: center;
      input {
        padding: 10px 130px 10px 10px;
      }
      button {
        font-size: 25px;
        padding: 10px 3px;
      }
    }
  }
`;

const BoardSearch = ({ onBoardSearch }) => {
  const [boardSearchValue, setBoardSearchValue] = useState("");

  const handleInputChange = (e) => {
    setBoardSearchValue(e.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const onClick = () => {
    handleSearch();
  };

  const handleSearch = () => {
    if (boardSearchValue.length > 0) {
      onBoardSearch(boardSearchValue);
      setBoardSearchValue("");
    }
  };

  return (
    <BoardSearchBlock>
      <h2>공지사항</h2>
      <div className="searchWrap">
        <input
          type="search"
          placeholder="검색어 입력"
          value={boardSearchValue}
          onChange={handleInputChange}
          onKeyPress={onKeyPress}
        />
        <button type="button" onClick={onClick}>
          <IoSearch />
        </button>
      </div>
    </BoardSearchBlock>
  );
};

export default BoardSearch;

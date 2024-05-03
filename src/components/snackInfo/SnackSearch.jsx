import React, { useState } from "react";
import styled from "styled-components";

const SnackSearchBlock = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 100px 0 50px;
  text-align: center;

  h2 {
    font-size: 35px;
    color: #5a4620;
    margin-bottom: 130px;
  }
  input {
    border: 2px solid #5a462020;
    box-shadow: 0 0 1rem #5a462020;
    font-size: 16px;
    padding: 10px 30px;
    border-radius: 8px;
    max-width: 300px;
    margin-right: 10px;
  }
  button {
    color: #dee2e6;
    background: #6347ff;
    border-radius: 8px;
    padding: 10px 20px;
    border: 1px solid #5a462020;
    box-shadow: 0 0 1rem #5a462020;
    background: #5a4620;
    );
  }
`;

const SnackSearch = ({ onSearch }) => {
  const [searchValue, setSearchValue] = useState(""); //검색어 상태

  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const onClick = () => {
    handleSearch();
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (searchValue.length >= 1) {
      onSearch(searchValue);
      setSearchValue("");
    }
  };

  return (
    <SnackSearchBlock>
      <h2>과자 정보</h2>
      <input
        type="search"
        placeholder="과자를 검색하세요"
        value={searchValue}
        onChange={handleInputChange}
        onKeyPress={onKeyPress}
      />
      <button type="button" onClick={onClick}>
        검색
      </button>
    </SnackSearchBlock>
  );
};

export default SnackSearch;

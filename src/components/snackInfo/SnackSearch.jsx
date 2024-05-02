import React, { useState } from "react";
import styled from "styled-components";

const SnackSearchBlock = styled.div`
  max-width: 1200px;
  margin: auto;
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

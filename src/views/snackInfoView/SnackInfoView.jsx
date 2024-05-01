import React, { useState } from "react";
import styled from "styled-components";
import SnackSearch from "@/components/snackInfo/SnackSearch";
import SnackList from "@/components/snackInfo/SnackList";
import SnackTag from "@/components/snackInfo/SnackTag";

const SnackInfoViewBlock = styled.div``;

const SnackInfoView = () => {
  const [pageIndex, setPageIndex] = useState(0); // 페이지 인덱스 상태

  const handleButtonClick = (index) => {
    setPageIndex(index);
  };
  return (
    <SnackInfoViewBlock>
      <SnackSearch />
      <SnackTag onButtonClick={handleButtonClick} />
      <SnackList pageIndex={pageIndex} />
    </SnackInfoViewBlock>
  );
};

export default SnackInfoView;

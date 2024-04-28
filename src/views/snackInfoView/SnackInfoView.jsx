import React from "react";
import styled from "styled-components";
import SnackSearch from "@/components/snackInfo/SnackSearch";
import SnackList from "@/components/snackInfo/SnackList";

const SnackInfoViewBlock = styled.div``;

const SnackInfoView = () => {
  return (
    <SnackInfoViewBlock>
      <SnackSearch />
      <SnackList />
    </SnackInfoViewBlock>
  );
};

export default SnackInfoView;

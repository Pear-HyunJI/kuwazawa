import React from "react";
import styled from "styled-components";
import InfoSection from "@/components/storeInfo/InfoSection";
import MapSection from "@/components/storeInfo/MapSection";

const StoreInfoViewBlock = styled.div``;

const StoreInfoView = () => {
  return (
    <StoreInfoViewBlock>
      <InfoSection />
      <MapSection />
    </StoreInfoViewBlock>
  );
};

export default StoreInfoView;

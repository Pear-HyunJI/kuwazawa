import React from "react";
import styled from "styled-components";
import InfoSection from '@/components/home/info/InfoSection'
import MapSection from "@/components/home/info/MapSection";


const StoreInfoViewBlock = styled.div``;

const StoreInfoView = () => {
  return <StoreInfoViewBlock>
    <InfoSection />
    <MapSection />
    </StoreInfoViewBlock>;
};

export default StoreInfoView;

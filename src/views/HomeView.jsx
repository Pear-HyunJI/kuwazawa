import React from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";

const HomeViewBlock = styled.div``;

const HomeView = () => {
  return (
    <HomeViewBlock>
      <p>11</p>
      <MainSlider />
      <SnackSlider />
    </HomeViewBlock>
  );
};

export default HomeView;

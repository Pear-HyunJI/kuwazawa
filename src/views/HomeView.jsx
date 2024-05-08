import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";
import StartSnackSlider from "@/components/home/StartSnackSlider";
import Opening from "@/components/home/Opening";
import TextArea from "@/components/home/TextArea";
import OtherSection from "@/components/home/OtherSection";
import ContentBlock from "@/components/home/ContentBlock";

const HomeViewBlock = styled.div``;

const OtherSectionBlock = styled.div`
  border-radius: 100px;
  margin-top: -90px;
  z-index: 11;
  background-color: #fffbf2;
  position: relative;
`;

const SnackSliderBlock = styled.div`
  z-index: 10;
  position: relative;
`;

const HomeView = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      console.log(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HomeViewBlock>
      <Opening scrollPosition={scrollPosition} />
      <MainSlider />
      <TextArea scrollPosition={scrollPosition} />
      <StartSnackSlider scrollPosition={scrollPosition} />
      <SnackSliderBlock>
        <SnackSlider />
      </SnackSliderBlock>
      <OtherSectionBlock>
        <OtherSection />
      </OtherSectionBlock>
      <ContentBlock />

    </HomeViewBlock>
  );
};

export default HomeView;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";
import StartSnackSlider from "@/components/home/StartSnackSlider";
import Opening from "@/components/home/Opening";
import TextArea from "@/components/section/TextArea";
import OtherSection from "@/components/section/OtherSection";
import ContentBlock from "@/components/home/ContentBlock";

const HomeViewBlock = styled.div``;

const HomeView = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
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
      <TextArea />
      <StartSnackSlider scrollPosition={scrollPosition} />
      <SnackSlider />
      <OtherSection />
      <ContentBlock />
    </HomeViewBlock>
  );
};

export default HomeView;

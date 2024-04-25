import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";
import Opening from "@/components/home/Opening";

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
      <SnackSlider />
    </HomeViewBlock>
  );
};

export default HomeView;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";
import Opening from "@/components/home/Opening";

const HomeViewBlock = styled.div`
  height: 1500px;
`;

const HomeView = () => {
  const [showOpening, setShowOpening] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = 0;
      const scrolled = window.scrollY;

      if (scrolled > scrollThreshold) {
        setShowOpening(false);
      } else {
        setShowOpening(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <HomeViewBlock>
      {showOpening ? (
        <Opening />
      ) : (
        <>
          <MainSlider />
          <SnackSlider />
        </>
      )}
    </HomeViewBlock>
  );
};

export default HomeView;

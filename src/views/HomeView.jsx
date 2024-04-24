import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";
import Opening from "@/components/home/Opening";

const HomeViewBlock = styled.div`
<<<<<<< HEAD
=======
  height: 1500px;
>>>>>>> 0b08b5abf4ea354ba319afaef9a7275aab818b68
`;

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
<<<<<<< HEAD
       <Opening scrollPosition={scrollPosition} />
       <MainSlider />
       <SnackSlider />
=======
      {showOpening ? (
        <Opening />
      ) : (
        <>
          <MainSlider />
          <SnackSlider />
        </>
      )}
>>>>>>> 0b08b5abf4ea354ba319afaef9a7275aab818b68
    </HomeViewBlock>
  );
};

export default HomeView;
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MainSlider from "@/components/home/MainSlider";
import SnackSlider from "@/components/home/SnackSlider";
import Opening from "@/components/home/Opening";
import TextArea from "@/components/section/TextArea";
import OtherSection from "@/components/section/OtherSection";

<<<<<<< HEAD
const HomeViewBlock = styled.div`

`;
=======
const HomeViewBlock = styled.div``;
>>>>>>> ea797c54e7e147623ebbec1d884fa45d88952d56

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
       <TextArea />
       <SnackSlider />
       <OtherSection />
=======
      <Opening scrollPosition={scrollPosition} />
      <MainSlider />
      <SnackSlider />
>>>>>>> ea797c54e7e147623ebbec1d884fa45d88952d56
    </HomeViewBlock>
  );
};

export default HomeView;

import React from "react";
import styled from "styled-components";

const InfoMiniGameBlock = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  height: 500px;
  //   border: 1px solid red;
  h2 {
    font-size: 50px;
    color: #5a4620;
  }
  img {
    width: 300px;
  }
`;

const InfoMiniGame = () => {
  return (
    <InfoMiniGameBlock>
      <h2>쿠와도라 게임</h2>
      <div>
        <img src="./assets/image/game/key.png" alt="" />
      </div>
    </InfoMiniGameBlock>
  );
};

export default InfoMiniGame;

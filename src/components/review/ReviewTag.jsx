import React from "react";
import styled from "styled-components";

const ReviewTagBlock = styled.div`
  padding: 120px 0 50px;
  display: flex;
  justify-content: center;
  button {
    width: 100px;
    height: 40px;
    margin: 0 20px;
    background: #ddd;
    color: #fff;
    border-radius: 5px;
    &.on {
      background: #5a4620;
    }
  }
`;

const ReviewTag = ({ changeShowPhotosOnly, showPhotosOnly }) => {
  return (
    <ReviewTagBlock>
      <button
        className={!showPhotosOnly ? "on" : ""}
        onClick={() => changeShowPhotosOnly(false)}
      >
        모든 리뷰 보기
      </button>
      <button
        className={showPhotosOnly ? "on" : ""}
        onClick={() => changeShowPhotosOnly(true)}
      >
        포토리뷰만 보기
      </button>
    </ReviewTagBlock>
  );
};

export default ReviewTag;
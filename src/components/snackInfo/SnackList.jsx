import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import PageFlip from "react-pageflip";
import oddPagesData from "@/assets/data/oddPages";
import evenPagesData from "@/assets/data/evenPages";

const SnackListBlock = styled.div`
  .book-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .page {
    width: 100%;
    height: 100%;
    background-color: #edecd1;
    border: 1px solid #5a462090;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    padding: 30px;
  }

  .oddPage {
    text-align: center;
    .kategory {
      font-size: 10px;
    }
    .title {
      font-size: 30px;
    }
    .titleImage {
      border: 2px solid #5a4620;
      border-radius: 200px;
    }
    .subTitle {
    }
  }
  .evenPage {
    text-align: center;
    .content {
      font-size: 16px;
    }
    .contentImage {
      display: block;
      width: 200px;
      border: 0px solid #5a4620;
      border-radius: 50%;
      // transform: translateX(50%);
    }
  }
`;

const SnackList = ({ pageIndex }) => {
  const pageFlipRef = useRef(null);
  console.log("클릭페이지", pageIndex);
  console.log("현재페이지", pageFlipRef.current);

  useEffect(() => {
    if (pageFlipRef.current) {
      // 페이지 인덱스 변경 시 해당 페이지를 펼치도록 설정
      pageFlipRef.current = pageIndex;
      // pageFlipRef.current.pageFlip.gotoPage(pageIndex);
    }
  }, [pageIndex, pageFlipRef.current]);

  const handlePrevClick = () => {
    pageFlipRef.current.flipPrev();
  };

  const handleNextClick = () => {
    pageFlipRef.current.flipNext();
  };

  const oddPages = oddPagesData;
  const evenPages = evenPagesData;

  const allPages = oddPages.reduce((acc, page, index) => {
    acc.push(
      <div
        className="page oddPage"
        key={`odd-${index}`}
        onClick={handleNextClick}
        style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.6)" }}
      >
        <p className="kategory">{page.kategory}</p>
        <h2 className="title">{page.title}</h2>
        <img className="titleImage" src={page.image} alt="" />
        <p className="subTitle">{page.content}</p>
        <p>{index * 2 + 1}</p>
        <p>{index}</p>
      </div>
    );

    if (evenPages[index]) {
      acc.push(
        <div
          className="page evenPage"
          key={`even-${index}`}
          onClick={handleNextClick}
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.6)" }}
        >
          <img
            className="contentImage"
            src={evenPages[index].image1}
            alt={`Page ${index + 2} Image`}
          />
          <img
            className="contentImage"
            src={evenPages[index].image2}
            alt={`Page ${index + 2} Image`}
          />
          <img
            className="contentImage"
            src={evenPages[index].image3}
            alt={`Page ${index + 2} Image`}
          />
          <p className="content">{evenPages[index].text1}</p>
          <p>{index * 2 + 2}</p>
          <p>{index}</p>
        </div>
      );
    }

    return acc;
  }, []);

  return (
    <SnackListBlock>
      <div className="book-container">
        <PageFlip width={650} height={800} ref={pageFlipRef}>
          {allPages}
        </PageFlip>
      </div>
    </SnackListBlock>
  );
};

export default SnackList;

import React, { useEffect, useRef, useState } from "react";
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
    font-family: "Gungsuh", serif;
  }

  .page {
    color: #504532;
    width: 100%;
    height: 100%;
    // background-color: #edecd1;
    background-color: #fffee9;
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
      color: #50453299;
      position: relative;
      font-size: 50px;
      &::before {
        content: "";
        position: absolute;
        top: 130%;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 50px;
        background-color: black;
        opacity: 1;
      }
    }
    .titleContainer {
      margin: 150px 0 50px;

      position: relative;
      .title {
        color: #504532;
        font-size: 50px;
        position: absolute;
        writing-mode: vertical-lr;
        top: -20%;
        left: 15%;
        font-weight: 100;
      }
      .titleImage {
        border: 0px solid #5a4620;
        border-radius: 200px;
      }
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

const SnackList = ({ pageIndex, searchKeyword }) => {
  const oddPages = oddPagesData;
  const evenPages = evenPagesData;
  const pageFlipRef = useRef();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  console.log("클릭페이지", pageIndex);
  console.log("현재페이지", currentPageIndex);
  console.log("검색값", searchKeyword);

  const changePage = () => {
    const pageNum = 4;
    pageFlipRef.current.pageFlip().flip(pageNum);
  };

  useEffect(() => {
    if (pageIndex !== undefined && currentPageIndex !== pageIndex) {
      // pageIndex와 currentPageIndex와 다를 때
      // pageFlipRef.current.pageFlip().flip(pageIndex);
      setCurrentPageIndex(pageIndex);
      setTimeout(() => {
        pageFlipRef.current.pageFlip().flip(pageIndex);
      }, 500);
    }
  }, [pageIndex, currentPageIndex]);

  useEffect(() => {
    if (searchKeyword && searchKeyword.length >= 1) {
      const matchedPages = oddPagesData.filter((page) =>
        page.title.includes(searchKeyword)
      );

      if (matchedPages.length > 0) {
        const matchedPageIndex = oddPagesData.indexOf(matchedPages[0]) * 2;
        console.log("matchedPageIndex", matchedPageIndex);
        setCurrentPageIndex(matchedPageIndex);
        // pageFlipRef.current.pageFlip().turnToPage(matchedPageIndex);
        // pageFlipRef.current.pageFlip().flip(matchedPageIndex);
        setTimeout(() => {
          pageFlipRef.current.pageFlip().flip(matchedPageIndex);
        }, 500);
      }
    }
  }, [searchKeyword]);

  const onFlip = () => {
    const currentPage = pageFlipRef.current.pageFlip().getCurrentPageIndex();
    setCurrentPageIndex(currentPage);
  };

  const allPages = oddPages.reduce((acc, page, index) => {
    acc.push(
      <div
        className="page oddPage"
        key={`odd-${index}`}
        style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.6)" }}
      >
        <p className="kategory">{page.kategory}</p>
        <div className="titleContainer">
          <h2 className="title">{page.title}</h2>
          <img className="titleImage" src={page.image} alt="" />
        </div>
        <p className="subTitle">{page.content}</p>
        <p>{index * 2 + 1}</p>
        <p>{index}</p>
        <p>실제페이지 인덱스 : {index * 2}</p>
      </div>
    );

    if (evenPages[index]) {
      acc.push(
        <div
          className="page evenPage"
          key={`even-${index}`}
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
          <p>실제페이지 인덱스 : {index * 2 + 1}</p>
        </div>
      );
    }

    return acc;
  }, []);

  return (
    <SnackListBlock>
      <div className="book-container">
        <PageFlip width={650} height={800} ref={pageFlipRef} onFlip={onFlip}>
          {allPages}
        </PageFlip>
        <div>
          <button onClick={changePage}>페이지 이동</button>
        </div>
      </div>
    </SnackListBlock>
  );
};

export default SnackList;

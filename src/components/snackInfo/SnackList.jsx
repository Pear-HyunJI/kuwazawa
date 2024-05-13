import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import PageFlip from "react-pageflip";
import oddPagesData from "@/assets/data/oddPages";
import evenPagesData from "@/assets/data/evenPages";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useMediaQuery } from "react-responsive";

const SnackListBlock = styled.div`

padding: 100px 0;
  .book-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    font-family: "Gungsuh", serif;
  }

  .page {
    color: #504532;
    width: 100%;
    height: 100%;
    // background-color: #edecd1;
    background-color: #fffee9;
    border: 0px solid #5a462099;
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.8);

    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    padding: 30px;
    .pageIndex {
      font-size: 15px;
      position: absolute;
      bottom: 3%;
      left: 50%;
      transform: translateX(-50%);
    }
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
        background-color: #50453299;
        opacity: 1;
      }
    }
    .titleContainer {
      margin: 120px 0 85px;

      position: relative;
      .title {
        color: #504532;
        font-size: 40px;
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
      font-weight: lighter;
      position: relative;
      font-size: 20px;

      &::before {
        content: "";
        position: absolute;
        top: -190%;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 35px;
        background-color: #50453299;
        opacity: 1;
      }
    }
  }
  .evenPage {
    text-align: center;
    // display: flex;
    // justify-content: center;
    .imageContainer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      .center{
        width: 100%;
        display: flex;
        align-items: center;
        text-align: center;
        .contentImage {
          margin: 15px;
          width: 170px;
          border: 0px solid #5a4620;
          border-radius: 50%;
        }
        .content{
          flex: 1;
          font-size: 16px;
          font-weight: lighter;
          word-break: keep-all;
        }
      }
    }
    .info {
      font-size: 12px;
    }
  }
  button {
    padding: 10px;
    background: #5a4620;
    color: #fff;
    margin : 10px;
    .prevPage {
      position: a
      top: 10px;
      left: 10px;
     
    }
    .nextPage {
      top: 100px;
      right: 10px;
    }
  }
  @media screen and (max-width: 412px) {
    padding: 10px;
    .oddPage{
      .kategory{
        font-size: 30px;
        &::before{
          height: 35px;
        }
      }
      .titleContainer{
        
        margin: 80px 0 80px;
        .title{
          font-size: 24px;
        }
      }
      .subTitle{
        font-size: 19px;
        word-break: keep-all;
        &::before {
        content: "";
        position: absolute;
        top: -105%;
        left: 50%;
        transform: translateX(-50%);
        width: 1px;
        height: 35px;
        background-color: #50453299;
        opacity: 1;}
      
      }
    }
    .evenPage{
      .imageContainer{.center{
        .contentImage {
          margin: 2px;
          width: 130px;
        }
      }}
      .info {
        margin-top: 10px;
        font-size: 10px;
      }
    }
    button{
      margin: 0 -9px;
      z-index:1;
     
    }
  }
`;

const SnackList = ({ pageIndex, searchKeyword }) => {
  const mobile = useMediaQuery({ maxWidth: 412 });
  const oddPages = oddPagesData;
  const evenPages = evenPagesData;
  const pageFlipRef = useRef();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  console.log("클릭페이지", pageIndex);
  console.log("현재페이지", currentPageIndex);
  console.log("검색값", searchKeyword);

  const onFlip = () => {
    const currentPage = pageFlipRef.current.pageFlip().getCurrentPageIndex();
    if (currentPage == currentPageIndex) {
      setCurrentPageIndex(currentPage);
    }
  };

  const nextPage = () => {
    setTimeout(() => {
      pageFlipRef.current.pageFlip().flipNext();
    }, 500);
  };
  const prevPage = () => {
    setTimeout(() => {
      pageFlipRef.current.pageFlip().flipPrev();
    }, 500);
  };

  // 태그 기능
  useEffect(() => {
    if (pageIndex !== undefined && currentPageIndex !== pageIndex) {
      // pageIndex와 currentPageIndex와 다를 때
      setCurrentPageIndex(pageIndex);
      setTimeout(() => {
        pageFlipRef.current.pageFlip().flip(pageIndex);
      }, 500);
    }
  }, [pageIndex, currentPageIndex]);

  //서치 기능
  useEffect(() => {
    if (searchKeyword && searchKeyword.length >= 1) {
      const matchedPages = oddPagesData.filter((page) =>
        page.title.includes(searchKeyword)
      );

      if (matchedPages.length > 0) {
        const matchedPageIndex = oddPagesData.indexOf(matchedPages[0]) * 2;
        console.log("matchedPageIndex", matchedPageIndex);
        setCurrentPageIndex(matchedPageIndex);
        setTimeout(() => {
          pageFlipRef.current.pageFlip().flip(matchedPageIndex);
        }, 500);
      }
    }
  }, [searchKeyword]);

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
        <p className="pageIndex">-{index * 2 + 1}-</p>
        {/* <p>실제페이지 인덱스 : {index * 2}</p> */}
      </div>
    );

    if (evenPages[index]) {
      acc.push(
        <div
          className="page evenPage"
          key={`even-${index}`}
          style={{ boxShadow: "inset 0px 0px 10px rgba(0, 0, 0, 0.6)" }}
        >
          <div className="imageContainer">
            <div className="center">
              <img
                className="contentImage"
                src={evenPages[index].image1}
                alt={`Page ${index + 2} Image`}
              />
              <p className="content">{evenPages[index].text1}</p>
            </div>
            <div className="center">
              <p className="content">{evenPages[index].text2}</p>
              <img
                className="contentImage"
                src={evenPages[index].image2}
                alt={`Page ${index + 2} Image`}
              />
            </div>
            <div className="center">
              <img
                className="contentImage"
                src={evenPages[index].image3}
                alt={`Page ${index + 2} Image`}
              />
              <p className="content">{evenPages[index].text3}</p>
            </div>
          </div>
          <p className="info">{evenPages[index].text4}</p>
          <p className="pageIndex">-{index * 2 + 2}-</p>
          {/* <p>실제페이지 인덱스 : {index * 2 + 1}</p> */}
        </div>
      );
    }

    return acc;
  }, []);

  return (
    <SnackListBlock>
      <div className="book-container">
        <button className="prevPage" onClick={prevPage}>
          <GrPrevious />
        </button>
        {mobile ? (
          <PageFlip width={360} height={500} ref={pageFlipRef} onFlip={onFlip}>
            {allPages}
          </PageFlip>
        ) : (
          <PageFlip width={600} height={700} ref={pageFlipRef} onFlip={onFlip}>
            {allPages}
          </PageFlip>
        )}

        <button className="nextPage" onClick={nextPage}>
          <GrNext />
        </button>
      </div>
    </SnackListBlock>
  );
};

export default SnackList;

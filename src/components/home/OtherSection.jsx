import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const OtherSectionBlock = styled.div`
  text-align: center;
  padding: 120px 0;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  h2 {
    font-size: 2rem;
    color: #5a4620;
    margin-bottom: 50px;
  }

  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    flex: 0 0 calc(33.333% - 20px);
    margin: 50px 0px;
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: translateY(-5px);
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    transition: transform 0.5s;

    &:hover {
      transform: scale(0.8) rotate(15deg);
    }
  }

  p {
    color: #5a4620;
    font-size: 1.2rem;
    margin-top: 10px;
  }

  @media (max-width: 412px) {
    h2 {
      font-size: 1.6rem;
    }
    li {
      flex: 0 0 calc(40% - 20px);
      margin: 20px 30px;

      position: relative;
      height: 160px;
    }
    img {
      width: 90%;
    }
    p {
      position: absolute;
      width: 100%;

      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
    }
  }
`;

const OtherSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // 요소가 보여야 할 스크롤 위치
      const scrollThreshold = 9999; // 예시로 설정한 임계값

      // 다른 대표 메뉴 섹션의 위치 계산
      const otherSectionElement = document.querySelector("#other-section");
      const otherSectionPosition =
        otherSectionElement.getBoundingClientRect().top;

      // 스크롤 위치에 따라 요소의 가시성 결정
      setIsVisible(otherSectionPosition < scrollThreshold);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const bread = [
    {
      img: "./assets/image/homeSnack/home_img11.png",
      name: "사과나무",
      scrollPosition: 0,
    },
    {
      img: "./assets/image/homeSnack/home_img12.png",
      name: "카스텔라",
      scrollPosition: 0,
    },
    {
      img: "./assets/image/homeSnack/home_img13.png",
      name: "보름달",
      scrollPosition: 0,
    },
    {
      img: "./assets/image/homeSnack/home_img14.png",
      name: "백안과 생초코",
      scrollPosition: 0,
    },
    {
      img: "./assets/image/homeSnack/home_img15.png",
      name: "구운 도넛",
      scrollPosition: 0,
    },
    {
      img: "./assets/image/homeSnack/home_img16.png",
      name: "크림 치즈의 달",
      scrollPosition: 0,
    },
  ];

  return (
    <OtherSectionBlock id="other-section" className="row" isVisible={isVisible}>
      <h2>다른 대표메뉴</h2>
      <ul>
        {bread.map((item, index) => (
          <li key={index}>
            <Link
              to={{
                pathname: "/snackInfo",
                state: { scrollPosition: item.scrollPosition },
              }}
            >
              <img src={item.img} alt={item.name} />
              <p>{item.name}</p>
            </Link>
          </li>
        ))}
      </ul>
    </OtherSectionBlock>
  );
};

export default OtherSection;

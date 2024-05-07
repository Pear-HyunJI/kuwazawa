import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";


const OtherSectionBlock = styled.div`
  text-align: center;
  padding: 100px 0;

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
    margin: 10px;
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

  @media (max-width: 768px) {
    li {
      flex: 0 0 calc(33.333% - 20px);
    }
  }

  @media (max-width: 480px) {
    li {
      flex: 0 0 calc(33.333% - 20px);
    }
  }
`;

const OtherSection = () => {
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
    <OtherSectionBlock className="row">
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
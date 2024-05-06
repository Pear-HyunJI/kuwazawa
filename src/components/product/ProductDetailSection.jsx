import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ProductDetailSectionBlock = styled.div`
  margin-top: 100px;
  h2 {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
  }
  .content {
    // display: flex;
    // align-item: center;
    // justify-content: center;
    .sliderContainer {
      max-width: 600px;
      .subSlide {
        border: 1px solid green;
        .slick-slide {
          border: 1px solid red;
          padding: 10px;
        }
      }
    }
    .info {
      p {
        padding: 20px 0;
      }
      button {
        background: red;
        margin: 10px 0;
      }
      .btn {
        a {
          padding: 10px 20px;
          background: #5a4620;
          color: #fff;
          margin: 20px 5px;
          &:nth-child(3) {
            background: #ddd;
            color: #000;
          }
        }
      }
    }
  }
`;

const ProductDetailSection = ({ product }) => {
  // 관리자 로그인
  const manager = useSelector((state) => state.members.manager);
  const [loging, setLoging] = useState(false);
  useEffect(() => {
    setLoging(manager);
  }, [manager]);

  // 슬라이더 동기화

  const [nav, setNav] = useState(null);
  const [subNav, setSubNav] = useState(null);
  let sliderRef = useRef(null);
  let subSliderRef = useRef(null);

  useEffect(() => {
    setNav(sliderRef.current);
    setSubNav(subSliderRef.current);
  }, []);

  return (
    <ProductDetailSectionBlock className="row">
      <h2>{product.name}</h2>
      <div className="content">
        <div className="sliderContainer">
          <Slider
            className="slide"
            asNavFor={subNav}
            ref={sliderRef}
            arrows={false}
            fade={true}
          >
            {product.detailPhotos.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item} alt="" />
                </div>
              );
            })}
          </Slider>
          <Slider
            className="subSlide"
            asNavFor={nav}
            ref={subSliderRef}
            slidesToShow={3}
            slidesToScroll={1}
            dots={true}
            centerMode={true}
            focusOnSelect={true}
            infinite={true}
            draggable={false}
            initialSlide={0} // 처음에 첫 번째 슬라이드부터 시작
          >
            {product.detailPhotos.map((item, index) => {
              return (
                <div key={index}>
                  <img src={item} alt="" />
                </div>
              );
            })}
          </Slider>
        </div>

        <div className="info">
          <p>{product.category}</p>
          <p>가격 : {product.price.toLocaleString()}&yen;</p>
          <p>
            <span dangerouslySetInnerHTML={{ __html: product.description }} />
          </p>
          <div className="btn">
            <Link to="">구매하기</Link>
            <Link to="/review">리뷰쓰기</Link>
            {loging && (
              <Link to="/productModify" state={{ product }}>
                상품수정
              </Link>
            )}
          </div>
        </div>
      </div>
    </ProductDetailSectionBlock>
  );
};

export default ProductDetailSection;

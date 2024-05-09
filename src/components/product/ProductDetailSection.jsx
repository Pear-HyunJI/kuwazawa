import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "@/components/product/Modal";

const ProductDetailSectionBlock = styled.div`
  margin-top: 100px;
  text-align: center;
  padding: 50px 0;
  .content {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    .sliderContainer {
      max-width: 600px;
      .subSlide {
        border: 1px solid #ddd;
        margin-top: 20px;
        .slick-slide {
          padding: 10px;
        }
      }
    }

    .info {
      padding: 20px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      margin-left: 20px;
      max-width: 400px;

      p {
        padding: 10px 0;
        color: #555;
      }

      span {
        margin-right: 10px;
        color: #555;
      }

      input {
        width: 50px;
        padding: 8px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 16px;
      }
    }

    .btn {
      align-items: center;
      margin: 5px 0;
      a {
        display: inline-block;
        margin: 10px;
        padding: 12px 24px;
        background-color: #5a4620;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
        text-decoration: none;
        transition: background 0.3s;
        width: 300px;
        &:hover {
          background-color: #3d3115;
        }
      }
    }
  }
  @media (max-width: 768px) {
    margin-top: 100px;
    text-align: center;
    padding: 50px 0;
    .content {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-wrap: wrap;
      .sliderContainer {
        max-width: 350px;
        .subSlide {
          border: 1px solid #ddd;
          margin-top: 20px;
          .slick-slide {
            padding: 10px;
          }
        }
      }

      .info {
        padding: 20px;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        margin-left: 0px;
        max-width: 400px;

        p {
          padding: 10px 0;
          color: #555;
        }

        span {
          margin-right: 0px;
          color: #555;
        }

        input {
          width: 50px;
          padding: 8px;
          border-radius: 5px;
          border: 1px solid #ccc;
          font-size: 16px;
        }
      }

      .btn {
        align-items: center;
        margin: 5px 0;
        a {
          display: inline-block;
          margin: 10px;
          padding: 12px 24px;
          background-color: #5a4620;
          color: #fff;
          font-size: 16px;
          border-radius: 5px;
          text-decoration: none;
          transition: background 0.3s;
          width: 300px;
          &:hover {
            background-color: #3d3115;
          }
        }
      }
    }
  }
`;

const ProductDetailSection = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [modalOpen, setModalOpen] = useState({ open: false, what: "" });

  // 관리자 로그인
  const manager = useSelector((state) => state.members.manager);
  const [loging, setLoging] = useState(false);
  useEffect(() => {
    setLoging(manager);
  }, [manager]);

  const handleClick = () => {
    console.log("product :", product);
    console.log("product.name :", product.name);
  };

  const handleChange = (e) => {
    let newQty = parseInt(e.target.value);
    if (newQty < 1) {
      newQty = 1;
    }
    if (newQty > product.inventory) {
      newQty = product.inventory;
    }
    setQty(newQty);
  };

  const onReset = () => {
    setModalOpen(false);
  };
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
      <h2 style={{ color: "#333", marginBottom: "20px", fontSize: "30px" }}>
        {product.name}
      </h2>
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
            dots={false}
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
          <p>가격 : {product.price.toLocaleString()}&yen;</p>
          <p>
            <span dangerouslySetInnerHTML={{ __html: product.description }} />
          </p>

          <div className="btn">
            <p>
              구매수량 :{" "}
              <input type="number" value={qty} onChange={handleChange} />
            </p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen({ open: true, what: "cart" });
              }}
            >
              장바구니
            </a>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setModalOpen({ open: true, what: "buy" });
              }}
            >
              구매하기
            </a>

            {loging && (
              <Link to="/productModify" state={{ product }}>
                상품수정
              </Link>
            )}
            <Link
              to={`/review/${product.name}`}
              state={{ product: product }}
              onClick={handleClick}
            >
              리뷰쓰기
            </Link>
          </div>
        </div>
      </div>
      <Modal
        product={product}
        qty={qty}
        modalOpen={modalOpen}
        onReset={onReset}
      />
    </ProductDetailSectionBlock>
  );
};

export default ProductDetailSection;

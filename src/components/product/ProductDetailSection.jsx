import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "@/components/product/Modal";
import { fetchCarts } from "@/store/product";
import { kuwazawa_cartDB, kuwazawa_productDB } from "@/assets/firebase";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const ProductDetailSectionBlock = styled.div`
  text-align: center;
  padding: 100px 0;

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
        .slick-arrow {
          color: #000;
        }
        .slick-current {
          img {
            opacity: 0.3;
          }
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
  @media (max-width: 412px) {
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const carts = useSelector((state) => state.products.carts);
  const user = useSelector((state) => state.members.user);
  const [modalOpen, setModalOpen] = useState({ open: false, what: "" });
  const [qty, setQty] = useState(1);

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
    setModalOpen({ open: false, what: "" });
  };

  const cartIdCount = (id) => {
    const userItem = carts.find((value) => value.key == id);
    if (userItem) {
      return userItem.qty;
    } else {
      return 0;
    }
  };

  const addToCart = async (id) => {
    if (user) {
      try {
        const cartItemRef = kuwazawa_cartDB.child(user.key).child(id); // 해당 유저의 레퍼런스 생성
        const cartItemSnapshot = await cartItemRef.once("value"); // 해당 유저의 스냅샷 가져오기
        let quantity = 1;
        if (cartItemSnapshot.exists()) {
          // 해당 유저가 이미 장바구니에 있는 경우 수량을 증가시킴
          quantity = cartItemSnapshot.val().qty + qty;
        }
        // 장바구니에 상품 추가 또는 업데이트
        await cartItemRef.set({ qty: quantity });
        dispatch(fetchCarts()).then(() => {
          setModalOpen({ open: true, what: "cart" });
        });
      } catch (error) {
        console.log("오류메시지:", error);
      }
    } else {
      alert("로그인하세요.");
      sessionStorage.setItem("previousUrl", "/product");
      navigate("/login");
    }
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

  const removeProduct = async (e, key, id)=>{
    e.preventDefault()
    const answer = confirm("정말로 삭제하시겠습니까?")
    if (answer) {
        try {
            await kuwazawa_productDB.child(key).remove()
            const cartsSnapshot = await kuwazawa_cartDB.once('value');
            if (cartsSnapshot.val()){
              const userCartsObj = cartsSnapshot.val()
              for (const userCartKey in userCartsObj) {
                const userProductsObj = userCartsObj[userCartKey];
                for (const productId in userProductsObj) {
                  if (productId == id) {
                    // 해당 상품 ID를 가진 항목 삭제
                    await cartDB.child(userCartKey).child(productId).remove();
                  }
                }
              }
            }
            navigate('/product')
        } catch(error){
            console.log("오류 : ", error)
        }
    } else {
        return
    }
  }

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
            prevArrow={<IoIosArrowDropleftCircle />}
            nextArrow={<IoIosArrowDroprightCircle />}
            //         prevArrow: <IoIosArrowDropleftCircle />,
            // nextArrow: <IoIosArrowDroprightCircle />,
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
              {product.inventory - cartIdCount(product.id) ? (
                <input
                  id="quantity"
                  type="number"
                  value={qty}
                  onChange={handleChange}
                />
              ) : (
                <span>품절!</span>
              )}
            </p>
            {product.inventory - cartIdCount(product.id) ? (
              <>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(product.id);
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
              </>
            ) : (
              ""
            )}

            <Link to={`/review/${product.name}`} state={{ product: product }}>
              리뷰쓰기
            </Link>
            {user && user.userId == "junhyeok_an@naver.com" && (<Link to="/productModify" state={{ product }}>상품수정</Link>)}
            {(user && user.userId=='junhyeok_an@naver.com') && <a href="#" onClick={ (e)=>removeProduct(e, product.key, product.id) }>상품삭제</a>}
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

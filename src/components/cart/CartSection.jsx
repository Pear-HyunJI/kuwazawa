import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts, fetchCarts } from "@/store/product";
import { kuwazawa_cartDB } from "@/assets/firebase";
import { useNavigate } from "react-router-dom";
import EmptyCartImage from "../../assets/image/fadein/empty.gif";

const CartSectionBlock = styled.div`
  padding: 50px 0;

  h2 {
    font-size: 2.5rem;
    text-align: center;
    padding: 20px 0;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background: #fbfbfb;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  th,
  td {
    padding: 15px;
    border-bottom: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  td {
    input[type="number"] {
      width: 50px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 4px;
      text-align: center;
    }

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background-color: #5a4620;
      color: #fff;
      cursor: pointer;
      transition: all 0.5s;
      &:hover {
        background: #3d3115;
      }
    }
  }

  .empty {
    td {
      padding: 100px 0;
      text-align: center;
      font-size: 1.5rem;
      img {
        display: block;
        margin: 0 auto 20px;
        max-width: 200px;
      }
    }
  }

  tfoot {
    td {
      text-align: center;
    }
  }
  @media (max-width: 768px) {
    padding: 50px 50px;

    h2 {
      font-size: 2.5rem;
      text-align: center;
      padding: 20px 0;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      background: #fbfbfb;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    th,
    td {
      padding: 10px;
      border-bottom: 1px solid #ddd;
      text-align: left;
      font-size: 12px;
    }

    th {
      background-color: #f5f5f5;
      font-weight: bold;
      font-size: 14px;
    }

    .nameTd {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    td {
      input[type="number"] {
        width: 50px;
        padding: 5px;
        border: 1px solid #ccc;
        border-radius: 4px;
        text-align: center;
      }

      button {
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        background-color: #5a4620;
        color: #fff;
        cursor: pointer;
        transition: all 0.5s;
        font-size: 10px;
        &:hover {
          background: #3d3115;
        }
      }
    }

    .empty {
      td {
        padding: 100px 0;
        text-align: center;
        font-size: 1.5rem;
        img {
          display: block;
          margin: 0 auto 20px;
          max-width: 200px;
        }
      }
    }

    tfoot {
      td {
        text-align: center;
      }
    }
  }
`;

const CartSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const carts = useSelector((state) => state.products.carts);
  const user = useSelector((state) => state.members.user);

  const [tempProducts, setTempProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [allCount, setAllCount] = useState(0);

  const [quantityValues, setQuantityValues] = useState({});

  const onChange = (e, id, inventory) => {
    setQuantityValues((prevState) => ({
      ...prevState,
      [id]: newQty,
    }));
    let newQty = parseInt(e.target.value);
    if (newQty < 1) {
      newQty = 1;
    }
    if (newQty > inventory) {
      newQty = inventory;
    }
    if (user) {
      kuwazawa_cartDB
        .child(user.key)
        .child(id)
        .update({ qty: newQty })
        .then(() => {
          console.log("수량이 변경되었습니다.");
          dispatch(fetchProducts());
          dispatch(fetchCarts());
        })
        .catch((error) => {
          console.error("수량 업데이트 중 오류 발생:", error);
        });
    }
  };

  const removeCartItem = (id) => {
    if (user) {
      kuwazawa_cartDB
        .child(user.key)
        .child(id)
        .remove()
        .then(() => {
          setTempProducts((prevTempProducts) =>
            prevTempProducts.filter((item) => item.product.id !== id)
          );
          // 상품 삭제 후 합계와 주문상품수량 업데이트

          setTotal(0);
          setAllCount(0);
          // setQuantityValues(null);
        })
        .catch((error) => {
          console.error("삭제 중 오류 발생:", error);
        });
    }
  };

  const allBuy = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인을 하십시오.");
      sessionStorage.setItem("previousUrl", "/cart");
      navigate("/login");
    } else {
      navigate("/payment", { state: { product: tempProducts } });
    }
  };

  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleToggle = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const partBuy = (e) => {
    e.preventDefault();
    if (!user) {
      alert("로그인을 하십시오.");
      sessionStorage.setItem("previousUrl", "/cart");
      navigate("/login");
    } else {
      const selectedProductsData = tempProducts.filter((item) =>
        selectedProducts.includes(item.product.id)
      );
      navigate("/payment", { state: { product: selectedProductsData } });
    }
  };

  useEffect(() => {
    if (carts.length) {
      setTempProducts(() => {
        const newData = carts.map((item) => {
          const product = products.find((product) => product.id == item.key);
          return { product: product, qty: item.qty };
        });
        setTotal(
          newData.reduce(
            (acc, item) =>
              acc + parseInt(item.product.price) * parseInt(item.qty),
            0
          )
        );
        setAllCount(newData.reduce((acc, item) => acc + parseInt(item.qty), 0));
        return newData;
      });
    } else {
      setTempProducts([]);
    }
  }, [carts]);

  return (
    <CartSectionBlock className="row">
      <h2>장바구니</h2>
      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>이미지</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>기타</th>
          </tr>
        </thead>
        {tempProducts && tempProducts.length ? (
          <tbody>
            {tempProducts.map((item, index) => (
              <tr key={index}>
                <td style={{ textAlign: "center" }}>
                  <input
                    type="checkbox"
                    name="choice"
                    onClick={() => handleToggle(item.product.id)}
                  />
                </td>
                <td>
                  <img src={item.product.photo} alt={item.product.name} />
                </td>
                <td className="nameTd">
                  {item.product.name} (
                  {parseInt(item.product.price).toLocaleString()}&yen;)
                </td>
                <td>
                  <input
                    type="number"
                    value={quantityValues[item.product.id] || item.qty}
                    onChange={(e) =>
                      onChange(e, item.product.id, item.product.inventory)
                    }
                  />
                </td>
                <td>
                  {(
                    parseInt(item.product.price) * parseInt(item.qty)
                  ).toLocaleString()}
                  &yen;
                </td>
                <td>
                  <button
                    type="button"
                    onClick={() => removeCartItem(item.product.id)}
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr className="empty">
              <td colSpan="5">
                <img src={EmptyCartImage} alt="" />
                장바구니가 비어 있습니다.
              </td>
            </tr>
          </tbody>
        )}
        <tfoot>
          <tr>
            <td colSpan="5">
              합계 : {total.toLocaleString()} <br />
              주문상품수량 : {tempProducts && tempProducts.length}종 {allCount}
              개
            </td>
          </tr>
        </tfoot>
      </table>
      <div>
        <button type="button" onClick={partBuy}>
          선택상품 주문하기
        </button>
        <button type="button" onClick={allBuy}>
          전체상품 주문하기
        </button>
      </div>
    </CartSectionBlock>
  );
};

export default CartSection;

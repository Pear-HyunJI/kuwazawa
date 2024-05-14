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
    color: #333;
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
    font-size: 1rem;
    color: #555;
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
      font-size: 0.9rem;
    }

    button {
      padding: 8px 12px;
      border: none;
      border-radius: 4px;
      background-color: #5a4620;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
      &:hover {
        background: #3d3115;
      }
    }
  }

  .empty {
    td {
      padding: 100px 0;
      text-align: center;
      font-size: 1.2rem;
      color: #777;

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
      font-size: 1rem;
    }
  }
  .buttonGroup {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    button {
      margin-right: 10px;
      border: none;
      border-radius: 4px;
      background-color: #5a4620;
      color: #fff;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 0.9rem;
      padding: 10px 20px;
      color: #fff;
      &:hover {
        background: #3d3115;
      }
    }
  }

  @media (max-width: 768px) {
    padding: 50px 20px;

    h2 {
      font-size: 2rem;
    }

    table {
      th,
      td {
        padding: 10px;
        font-size: 0.8rem;
      }

      .nameTd {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      button {
        font-size: 0.8rem;
      }
    }

    .empty {
      td {
        font-size: 1rem;
      }
    }

    tfoot {
      td {
        font-size: 0.9rem;
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
  const [selectAll, setSelectAll] = useState(false);
  const [tempProducts, setTempProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [allCount, setAllCount] = useState(0);
  const [quantityValues, setQuantityValues] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  const onChange = (e, id, inventory) => {
    let newQty = parseInt(e.target.value);
    if (newQty < 1) {
      newQty = 1;
    }
    if (newQty > inventory) {
      newQty = inventory;
    }
    setQuantityValues((prevState) => ({
      ...prevState,
      [id]: newQty,
    }));
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

  const toggleSelectAll = (e) => {
    const isChecked = e.target.checked;
    setSelectAll(isChecked); // 전체선택 상태 업데이트

    // 모든 상품 체크박스의 선택 상태를 업데이트
    const allIds = tempProducts.map((item) => item.product.id);
    setSelectedProducts(isChecked ? allIds : []); // 전체 선택되었을 때 모든 상품 선택, 그렇지 않으면 선택 해제
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

  useEffect(() => {
    if (selectAll) {
      const allIds = tempProducts.map((item) => item.product.id);
      setSelectedProducts(allIds);
    } else {
      setSelectedProducts([]);
    }
  }, [selectAll, tempProducts]);

  // useEffect(() => {
  //   if (selectedProducts.length === tempProducts.length) {
  //     setSelectAll(true);
  //   } else {
  //     setSelectAll(false);
  //   }
  // }, [selectedProducts, tempProducts]);

  return (
    <CartSectionBlock className="row">
      <h2>장바구니</h2>
      <table>
        <thead>
          <tr>
            <th>
              전체선택{" "}
              <input
                type="checkbox"
                checked={selectAll}
                onChange={(e) => setSelectAll(e.target.checked)}
              />
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
                    checked={selectedProducts.includes(item.product.id)}
                    onChange={() => handleToggle(item.product.id)}
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
              <td colSpan="6">
                <img src={EmptyCartImage} alt="" />
                장바구니가 비어 있습니다.
              </td>
            </tr>
          </tbody>
        )}
        <tfoot>
          <tr>
            <td colSpan="6">
              합계 : {total.toLocaleString()} <br />
              주문상품수량 : {tempProducts && tempProducts.length}종 {allCount}
              개
            </td>
          </tr>
        </tfoot>
      </table>
      <div className="buttonGroup">
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

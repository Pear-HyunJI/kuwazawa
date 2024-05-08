import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/product';
import { kuwazawa_cartDB } from '@/assets/firebase';
import EmptyCartImage from '../../assets/image/fadein/empty.gif';

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
    input[type='number'] {
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
      &:hover{ background:#3d3115;}
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
      font-size:12px;
    }
  
    th {
      background-color: #f5f5f5;
      font-weight: bold;
      font-size:14px;
    }
  
    .nameTd{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    td {

      input[type='number'] {
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
        font-size:10px;
        &:hover{ background:#3d3115;}
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
  const dispatch = useDispatch();
  const products = useSelector(state => state.products.products);
  const carts = useSelector(state => state.products.carts);
  const [quantityValues, setQuantityValues] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const onChange = (e, id, inventory) => {
    let newQty = parseInt(e.target.value);
    if (newQty < 1) {
      newQty = 1;
    }
    if (newQty > inventory) {
      newQty = inventory;
    }
    setQuantityValues(prevState => ({
      ...prevState,
      [id]: newQty
    }));
    kuwazawa_cartDB
      .child(id)
      .update({ qty: newQty })
      .then(() => {
        console.log('수량이 업데이트되었습니다.');
        dispatch(fetchProducts());
      })
      .catch(error => {
        console.error('수량 업데이트 중 오류 발생:', error);
      });
  };

  const removeCartItem = id => {
    kuwazawa_cartDB
      .child(id)
      .remove()
      .then(() => {
        console.log('성공적으로 삭제되었습니다.');
        dispatch(fetchProducts());
      })
      .catch(error => {
        console.error('삭제 중 오류 발생:', error);
      });
  };

  

  const tempProducts = carts.map(item => {
    const product = products.find(product => product.id === item.id);
    return { product: product, qty: item.qty };
  });

  const total = tempProducts.reduce(
    (acc, item) => acc + item.product.price * item.qty,
    0
  );
  const allCount = tempProducts.reduce((acc, item) => acc + parseInt(item.qty), 0);

  return (
    <CartSectionBlock className="row">
      <h2>장바구니</h2>
      <table>
        <thead>
          <tr>
            <th>이미지</th>
            <th>상품명</th>
            <th>수량</th>
            <th>가격</th>
            <th>기타</th>
          </tr>
        </thead>
        {carts.length ? (
          <tbody>
            {tempProducts.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.product.photo} alt={item.product.name} />
                </td>
                <td className='nameTd'>
                  {item.product.name} ({parseInt(item.product.price).toLocaleString()}&yen;)
                </td>
                <td>
                  <input
                    type="number"
                    value={quantityValues[item.product.id] || item.qty}
                    onChange={e => onChange(e, item.product.id, item.product.inventory)}
                  />
                </td>
                <td>{(parseInt(item.product.price) * parseInt(item.qty)).toLocaleString()}&yen;</td>
                <td>
                  <button type="button" onClick={() => removeCartItem(item.product.id)}>
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
              주문상품수량 : {tempProducts.length}종 {allCount}개
            </td>
          </tr>
        </tfoot>
      </table>
    </CartSectionBlock>
  );
};

export default CartSection;
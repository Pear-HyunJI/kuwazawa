import React from 'react';
import styled from 'styled-components';

const PaymentSectionBlock = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  table {
    width: 100%;
    border-collapse: collapse;
    text-align: left;
    margin-bottom: 20px;
    
    th,
    td {
      padding: 15px;
      border-bottom: 1px solid #ddd;
    }

    th {
      font-weight: bold;
      background-color: #f5f5f5;
    }

    img {
      max-width: 100px;
      margin-right: 20px;
    }
  }
  .total {
    font-size: 24px;
    color: #5A4620;
    padding:20px;
    text-align:center;
  }
`;

const PaymentSection = ({ product, qty }) => {
  const totalPrice = parseInt(qty) * parseInt(product.price);
  const totalDeliveryPrice =  parseInt(qty) * parseInt(product.price) + 700;

  return (
    <PaymentSectionBlock>
      <table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>주문금액</th>
            <th>배송비</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <img src={product.photo} alt={product.name} />
              <div>
                <p>상품명: {product.name}</p>
                <p>수량: {qty}개</p>
                <p>가격: {product.price.toLocaleString()}&yen;</p>
              </div>
            </td>
            <td>{totalPrice.toLocaleString()}&yen;</td>
            <td>700&yen;</td>
          </tr>
        </tbody>
      </table>
      <div className="total">
        총 주문금액: {totalDeliveryPrice.toLocaleString()}&yen;
      </div>
    </PaymentSectionBlock>
  );
};

export default PaymentSection;
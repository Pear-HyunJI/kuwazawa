import React from 'react';
import styled from 'styled-components';

const CartSectionBlock = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background:#fff;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ccc;
`;

const ProductImage = styled.img`
  max-width: 100px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const CartSection = () => {
  return (
    <CartSectionBlock>
      <h2>장바구니</h2>
      <div className='cart'>
        <CartItem>
          <ProductImage src='product1.jpg' alt='Product 1' />
          <ProductInfo>
            <h3>상품명</h3>
            <p>가격: $10</p>
            <p>수량: 2</p>
            <p>총 가격: $20</p>
          </ProductInfo>
        </CartItem>
      </div>
    </CartSectionBlock>
  );
};

export default CartSection;
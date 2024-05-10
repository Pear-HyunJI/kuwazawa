import React from "react";
import styled from "styled-components";
import CartSection from "../../components/cart/CartSection";

const CartViewBlock = styled.div``;

const CartView = () => {
  return (
    <CartViewBlock>
      <CartSection />
    </CartViewBlock>
  );
};

export default CartView;

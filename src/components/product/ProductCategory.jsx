import React from "react";
import styled from "styled-components";

const ProductCategoryBlock = styled.div`
  padding: 120px 0 50px;
  display: flex;
  justify-content: center;
  button {
    width: 100px;
    height: 40px;
    margin: 0 20px;
    background: #ddd;
    color: #fff;
    border-radius: 5px;
    &.on {
      background: #5a4620;
    }
  }
`;

const ProductCategory = ({ changeTitle, title }) => {
  const category = ["all", "클래식상품", "시즌한정상품"];
  return (
    <ProductCategoryBlock>
      {category.map((item, index) => (
        <button
          key={index}
          type="button"
          onClick={() => changeTitle(item)}
          className={title == item && "on"}
        >
          {item}
        </button>
      ))}
    </ProductCategoryBlock>
  );
};

export default ProductCategory;

import React, {useState}  from "react";
import styled from "styled-components";
import ProductSlideSection from "@/components/product/ProductSlideSection";
import ProductSection from "@/components/product/ProductSection";

const ItemListViewBlock = styled.div``

const ProductView = () => {
  
  const [title, setTitle] = useState("all")
  const changeTitle = (value)=>{
      setTitle(value)
  }

  return <ItemListViewBlock>
    <ProductSlideSection  />
    <ProductSection  changeTitle={changeTitle} title={title} />
  </ItemListViewBlock>;
};

export default ProductView;

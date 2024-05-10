import React from "react";
import ProductModifySection from "@/components/product/ProductModifySection";
import { useLocation } from "react-router-dom";

const ProductModifyView = () => {
  const location = useLocation();
  const { product } = location.state;
  return (
    <div>
      <ProductModifySection item={product} />
    </div>
  );
};

export default ProductModifyView;

import React from "react";
import { useLocation } from "react-router-dom";
import ProductDetailSection from "@/components/product/ProductDetailSection";
import ReviewList from "@/components/review/ReviewList";

const ProductDetailView = () => {
  const location = useLocation();
  const { item } = location.state;

  console.log("아이템", item);

  return (
    <div className="row">
      <ProductDetailSection product={item} />
      <ReviewList product={item} />
    </div>
  );
};

export default ProductDetailView;

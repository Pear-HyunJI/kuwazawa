import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import ProductDetailSection from "@/components/product/ProductDetailSection";
import ReviewList from "@/components/review/ReviewList";
import ReviewTag from "@/components/review/ReviewTag";

const ProductDetailView = () => {
  const location = useLocation();
  const { item } = location.state;

  console.log("아이템", item);

  const [showPhotosOnly, setShowPhotosOnly] = useState(false);
  const changeShowPhotosOnly = (value) => {
    setShowPhotosOnly(value);
  };
  return (
    <div className="row">
      <ProductDetailSection product={item} />
      <ReviewTag
        changeShowPhotosOnly={changeShowPhotosOnly}
        showPhotosOnly={showPhotosOnly}
      />
      <ReviewList product={item} showPhotosOnly={showPhotosOnly} />
    </div>
  );
};

export default ProductDetailView;

import React from 'react';
import { useLocation } from 'react-router-dom'
import ProductDetailSection from '@/components/product/ProductDetailSection';
const ProductDetailView = () => {
    const location = useLocation()
    const { item } = location.state
    return (
        <div>
            <ProductDetailSection product={item} />
        </div>
    );
};

export default ProductDetailView;
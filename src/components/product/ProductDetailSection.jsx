import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'



const ProductDetailSectionBlock = styled.div`
  max-width: 800px;
  padding: 50px 0;
  h2 {
    text-align: center;
    font-size: 2.5rem;
    margin: 40px 0;
    color: #333;
  }

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;

    .photo {
      width: 300px;
    }

    .info {
      flex: 1;
      padding: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

      p {
        margin-bottom: 15px;
        font-size: 1.2rem;
        color: #666;
      }

      .btn {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin-top: 20px;

        a {
          padding: 12px 24px;
          background-color: #5A4620;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 1rem;
          transition: background-color 0.3s;

          &:hover {
            background-color: #48390f;
          }
        }
      }
    }
  }
`;

const ProductDetailSection = ({product}) => {

   const manager = useSelector(state=>state.members.manager)
   const [loging, setLoging] = useState(false)
   useEffect(()=>{
     setLoging(manager)
   }, [manager])

    return (
        <ProductDetailSectionBlock className="row"> 
            <h2>{ product.name }</h2>
            <div className="content">
                <div className="photo">
                    <img src={product.photo} alt={product.name} />
                </div>
                <div className="info">
                    <p>{ product.category }</p>
                    <p>가격 : { product.price.toLocaleString() }&yen;</p>
                    <p><span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                    <div className="btn">
                      <Link to="">구매하기</Link>
                      <Link to="/review">리뷰쓰기</Link>
                      { loging && <Link to="/productModify" state={{ product  }}>상품수정</Link>}
                    </div>
                </div>
            </div>
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;
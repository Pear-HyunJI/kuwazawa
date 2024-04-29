import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProductDetailSectionBlock = styled.div`
  h2 {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
  }
  .content {
    display: flex;
    align-item: center;
    justify-content:center;
    .photo {
      width: 300px;
      margin-right: 50px;
    }
    .info {
      flex:0 1 30%;
      p{
        padding:20px 0 ;
      }
      button {
        background: red;
        color: #fff;
        padding: 10px 20px;
        margin: 10px 0;
      }
      .btn {
        a { padding:10px 20px; background:#5A4620; color:#fff; margin:20px 5px;
          &:nth-child(2) { background:#ddd; color:#000 }
        }
      }
    }
  }
`

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
                    <p>{ product.price.toLocaleString() }</p>
                    <p><span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                    <div className="btn">
                      <Link to="">구매하기</Link>
                      { loging && <Link to="/productModify" state={{ product  }}>상품수정</Link>}
                    </div>
                </div>
            </div>
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;
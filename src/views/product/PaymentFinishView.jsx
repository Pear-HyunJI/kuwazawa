import React, {useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom'
import {kuwazawa_productDB, kuwazawa_cartDB} from '@/assets/firebase'
import {useSelector, useDispatch} from 'react-redux'
import {fetchProducts, fetchCarts} from '@/store/product'
import Truck from'../../assets/image/fadein/truck.png';
import styled from 'styled-components';

const PaymentFinishSectionBlock = styled.div`
 margin-top: 80px;
`
const MainSectionBlock = styled.div`
width: 100%;
border-top: 2px solid #ddd;
border-bottom: 2px solid #ddd;
padding: 32px;
text-align: center;
@media (max-width: 768px){
  width: 100%;
border-top: 0px solid #ddd;
border-bottom: 0px solid #ddd;
padding: 32px;
text-align: center;
}
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-width: 100%;
    margin-right: 16px;
  }
  p {
    margin: 0;
    font-size: 4.25rem;
    font-weight: bold;
    color: #333333;
  }
  @media (max-width: 768px){
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    img {
      max-width: 100%;
      margin-right: 16px;
    }
    p {
      margin: 0;
      font-size: 2.25rem;
      font-weight: bold;
      color: #333333;
      word-break: keep-all;
    }
  }
`;

const PaymentFinishView = () => {
    const user = useSelector(state=>state.members.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const {product} = location.state

    useEffect(()=>{
        product.map((item, index)=>{
            kuwazawa_productDB.child(item.product.key).update({...item.product, inventory: parseInt(item.product.inventory) - item.qty })
            .then(() => {
                console.log('수량이 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('수량 업데이트 중 오류 발생:', error);
            });
            kuwazawa_cartDB.child(user.key).child(item.product.id).remove()
            .then(()=>{
                console.log('장바구니가 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('업데이트 중 오류 발생:', error);
            });
        })
        dispatch(fetchProducts());        
        dispatch(fetchCarts())
    }, [])

    return (
        <PaymentFinishSectionBlock className="row">
            <MainSectionBlock>
              <ContentWrapper>
                <img src={Truck} alt="truck" />
                <div>
                  <p>고객님의 주문이</p>
                  <p>완료되었습니다.</p>
                </div>
              </ContentWrapper>
              <Link to="/product" style={{fontSize:"25px" ,textAlign:"center", width:"150px", height:"50px", padding:'10px', background:'#5A4620',color:"#fff"}}>돌아가기</Link>
          </MainSectionBlock>
        </PaymentFinishSectionBlock>
    );
};

export default PaymentFinishView;
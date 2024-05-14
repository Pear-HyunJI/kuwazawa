import React from 'react';
import styled from 'styled-components';
import Truck from'../../assets/image/fadein/truck.png';

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

const PaymentFinishSection = () => {
    return (
        <PaymentFinishSectionBlock className='row'>
          <MainSectionBlock>
              <ContentWrapper>
                <img src={Truck} alt="truck" />
                <div>
                  <p>고객님의 주문이</p>
                  <p>완료되었습니다.</p>
                </div>
              </ContentWrapper>
          </MainSectionBlock>
        </PaymentFinishSectionBlock>
    );
};

export default PaymentFinishSection;
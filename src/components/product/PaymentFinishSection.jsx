import React from 'react';
import styled from 'styled-components';
import Truck from'../../assets/image/fadein/truck.png';

const PaymentFinishSectionBlock = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-top: 80px;
  padding: 32px;
  text-align: center;
`;
const MainSectionBlock = styled.div`
width: 100%;
border-top: 2px solid #ddd;
border-bottom: 2px solid #ddd;
padding: 32px;
text-align: center;
`
const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 80px;
    margin-right: 16px;
  }

  p {
    margin: 0;
    font-size: 1.25rem;
    font-weight: bold;
    color: #333333;
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
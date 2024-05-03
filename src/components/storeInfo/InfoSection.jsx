import React from "react";
import styled from "styled-components";

const InfoSectionBlock = styled.div`
  max-width:100%;
  padding: 100px 20px;
  text-align: center;

  h2 {
    font-size: 2.5rem;
    color: #5a4620;
    margin-bottom: 50px;
  }

  .shopBox {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
  }

  .photoBox {
    max-width: 100%;
    border-radius: 15px;
    overflow: hidden;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .shopInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    border-bottom: 1px solid #ddd;
  }

  p {
    color: #333;
    margin: 0;
  }

  .bold {
    font-weight: bold;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

const InfoSection = () => {
  return (
    <InfoSectionBlock>
      <h2>점포 정보</h2>
      <div className="shopBox">
        <div className="photoBox">
          <img src="./assets/image/etc/store_img1.jpg" alt="점포" />
        </div>
      </div>
      <div className="shopInfo">
        <p className="bold">가게이름</p>
        <p>쿠와자와</p>
      </div>
      <div className="shopInfo">
        <p className="bold">영업시간</p>
        <p>AM8:00～PM18:30까지</p>
      </div>
      <div className="shopInfo">
        <p className="bold">정기휴일</p>
        <p>수요일 (공휴일 이외 )</p>
      </div>
      <div className="shopInfo">
        <p className="bold">전화</p>
        <p>0247-26-2851</p>
      </div>
      <div className="shopInfo">
        <p className="bold">팩스</p>
        <p>0247-26-8511</p>
      </div>
      <div className="shopInfo">
        <p className="bold">메일</p>
        <p>info@kuwazawa-wagashi.com</p>
      </div>
      <div className="shopInfo">
        <p className="bold">위치</p>
        <p>
          〒963-7808 후쿠시마현 이시카와군 이시카와초 후타리자 신주 20-1 (
          Google maps )
        </p>
      </div>
      <div className="shopBox">
        <div className="photoBox">
          <img src="./assets/image/etc/store_img2.jpg" alt="점포" />
        </div>
      </div>
      <div className="shopInfo">
        <p className="bold">가게이름</p>
        <p>쿠와자와</p>
      </div>
      <div className="shopInfo">
        <p className="bold">영업시간</p>
        <p>AM8:00～PM18:30까지</p>
      </div>
      <div className="shopInfo">
        <p className="bold">정기휴일</p>
        <p>수요일 (공휴일 이외 )</p>
      </div>
      <div className="shopInfo">
        <p className="bold">전화</p>
        <p>0247-26-2851</p>
      </div>
      <div className="shopInfo">
        <p className="bold">팩스</p>
        <p>0247-26-8511</p>
      </div>
      <div className="shopInfo">
        <p className="bold">메일</p>
        <p>info@kuwazawa-wagashi.com</p>
      </div>
      <div className="shopInfo">
        <p className="bold">위치</p>
        <p>
          〒963-7808 후쿠시마현 이시카와군 이시카와초 후타리자 신주 20-1 (
          Google maps )
        </p>
      </div>
    </InfoSectionBlock>
  );
};

export default InfoSection;

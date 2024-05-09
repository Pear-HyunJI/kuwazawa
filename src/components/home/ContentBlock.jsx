import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ContentBlockBlock = styled.div`
  padding: 200px 0; /* 조정된 패딩 값 */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around; /* 중앙 정렬 */
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-bottom: 50px;
  width: 300px; /* 조정된 너비 값 */
`;

const Photo = styled.div`
  width: 210px;
  height: 210px;
  overflow: hidden;
  border-radius: 50%; /* 동그랗게 보이도록 설정 */
  transition: all 0.5s;
  cursor: pointer; /* 이미지에 커서 변경 */
  margin-bottom: 20px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover; /* 이미지를 비율 유지하며 채우도록 설정 */
  }

  &:hover {
    opacity: 0.8; /* 투명도 조정 */
    transform: scale(1.05); /* 확대 효과 */
  }
  @media (max-width: 412px) {
    width: 150px;
    height: 150px;
  }
`;

const TextBox = styled.div`
  p {
    margin-bottom: 10px;
    color: #333; /* 텍스트 색상 */
  }
`;

const ContentBlock = () => {
  const Image = [
    {
      id: 1,
      img: "../../assets/image/etc/home_img17.jpg",
      alt: "안코를 잡다",
      comment: "일본식 과자 가게가 정중하게 만드렁낸 맛있는 앙금",
    },
    {
      id: 2,
      img: "../../assets/image/etc/home_img18.jpg",
      alt: "회사 소개",
      comment: "후쿠시마현 이시카와초에서 메이지 20년부터 영업했습니다.",
    },
    {
      id: 3,
      img: "../../assets/image/etc/home_img19.jpg",
      alt: "일본 과자",
      comment: "과자의 역사나 콩 지식등의 이것저것",
    },
  ];

  return (
    <ContentBlockBlock className="row">
      {Image.map((item) => (
        <Section key={item.id}>
          <Photo>
            <Link to={`/product/${item.id}`}>
              <img src={item.img} alt={item.alt} />
            </Link>
          </Photo>
          <TextBox>
            <p style={{ fontWeight: "bold" }}>{item.alt}</p>
            <p>{item.comment}</p>
          </TextBox>
        </Section>
      ))}
    </ContentBlockBlock>
  );
};

export default ContentBlock;

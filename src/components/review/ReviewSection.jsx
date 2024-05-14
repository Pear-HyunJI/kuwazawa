import React, { useState } from "react";
import styled from "styled-components";
import { kuwazawa_reviewDB, oStorage } from "@/assets/firebase";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ReviewSectionBlock = styled.div`
  max-width: 500px;
  margin: 0 auto;

  .content {
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
  }

  h2 {
    text-align: center;
    padding: 20px 0;
    font-size: 2rem;
  }

  .title {
    text-align: center;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;

    div {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;

      label {
        font-size: 1rem;
        margin-bottom: 5px;
      }

      select,
      textarea {
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        font-size: 1rem;
        width: 100%;
      }
    }

    .btn {
      display: flex;
      justify-content: center;

      button {
        padding: 10px 20px;
        background: #5a4620;
        color: #fff;
        border: none;
        border-radius: 5px;
        font-size: 1rem;
        cursor: pointer;
        transition: background-color 0.3s ease;

        &:hover {
          background: #3d3115;
        }
      }
    }
  }
`;

const ReviewSection = ({ productArray }) => {
  const location = useLocation();
  const { product } = location.state;

  const navigate = useNavigate();
  const user = useSelector((state) => state.members.user);
  const [review, setReview] = useState({
    rating: "",
    content: "",
    reviewPhotos: [],
  });

  const handleReviewFileChange = (e) => {
    const files = e.target.files;
    setReview((prevReview) => ({
      ...prevReview,
      reviewPhotos: Array.from(files),
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    try {
      if (!user) {
        alert("로그인 후 이용해주세요.");
        navigate("/login");
        return;
      }
      if (!review.rating) {
        alert("별점을 선택하세요.");
        return;
      }
      if (!review.content) {
        alert("리뷰 내용을 입력하세요.");
        return;
      }
      const storageRef = oStorage.ref();
      if (review.reviewPhotos.length > 0) {
        const reviewPhotoURLs = await Promise.all(
          review.reviewPhotos.map(async (file, index) => {
            const fileName = `reviewPhoto_${Date.now()}_${index}_${file.name}`;
            const reviewFileRef = storageRef.child(fileName);
            await reviewFileRef.put(file);
            return reviewFileRef.getDownloadURL();
          })
        );
        review.reviewPhotos = reviewPhotoURLs;
      }
      await kuwazawa_reviewDB.push({
        ...review,
        productId: product.id,
        writer: user.userId,
        date: date,
      });
      navigate(`/product`);
    } catch (error) {
      console.log("오류", error);
    }
  };

  return (
    <ReviewSectionBlock>
      <h2>리뷰 작성하기</h2>
      <p>상품 이름 : {product.name}</p>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="rating">별점주기:</label>
          <select
            name="rating"
            id="rating"
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: e.target.value })}
          >
            <option value="☆">☆</option>
            <option value="★">★</option>
            <option value="★★">★★</option>
            <option value="★★★">★★★</option>
            <option value="★★★★">★★★★</option>
            <option value="★★★★★">★★★★★</option>
          </select>
        </div>
        <div>
          <label htmlFor="content">리뷰 작성:</label>
          <textarea
            name="content"
            placeholder="리뷰를 작성해주세요."
            id="content"
            value={review.content}
            onChange={(e) => setReview({ ...review, content: e.target.value })}
          ></textarea>
        </div>
        <div>
          <label htmlFor="reviewPhoto">사진 등록하기:</label>
          <input
            type="file"
            name="reviewPhoto"
            id="reviewPhoto"
            onChange={handleReviewFileChange}
            multiple
          />
        </div>
        <div className="btn">
          <button type="submit">등록</button>
        </div>
      </form>
    </ReviewSectionBlock>
  );
};

export default ReviewSection;

import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { kuwazawa_reviewDB, oStorage } from "@/assets/firebase";

const ReviewModifyBlock = styled.div`
  max-width: 500px;
  margin: 0 auto;
  h2 {
    text-align: center;
    padding: 50px 0;
    font-size: 45px;
  }
  div {
    display: flex;
    padding: 5px;
    margin: 5px;
    label {
      width: 100px;
      display: inline-block;
    }
    select,
    textarea {
      flex: 1;
      border: 1px solid #000;
    }
    select {
      height: 30px;
    }
    textarea {
      height: 200px;
      padding: 5px;
    }
    &.btn {
      justify-content: center;
      margin-top: 20px;
      button {
        padding: 10px 20px;
        background: #5a4620;
        color: #fff;
      }
    }
  }
`;

const ReviewModify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { post } = location.state; //객체

  const initialReviewState = {
    rating: post.rating || "",
    content: post.content || "",
    reviewPhotos: post.reviewPhotos || [],
  };

  const [review, setReview] = useState(initialReviewState);
  const [newReviewPhotos, setNewReviewPhotos] = useState([]);

  useEffect(() => {
    setReview({
      rating: post.rating,
      content: post.content,
      reviewPhotos: post.reviewPhotos || [],
    });
  }, [post]);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setReview((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleReviewFileChange = (e) => {
    const files = e.target.files;
    setNewReviewPhotos(Array.from(files));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    try {
      const storageRef = oStorage.ref();
      if (newReviewPhotos.length > 0) {
        const reviewPhotoURLs = [];
        await Promise.all(
          newReviewPhotos.map(async (file, index) => {
            const fileName = `reviewPhoto${index + 1}_${Date.now()}_${
              file.name
            }`;
            const reviewFileRef = storageRef.child(fileName);
            await reviewFileRef.put(file);
            reviewPhotoURLs.push(await reviewFileRef.getDownloadURL());
          })
        );
        review.reviewPhotos = reviewPhotoURLs;
      }
      await kuwazawa_reviewDB.child(post.key).update({ ...review, date });
      navigate("/product");
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  return (
    <ReviewModifyBlock>
      <h2>수정 페이지</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="rating">별점주기:</label>
          <select
            name="rating"
            id="rating"
            value={review.rating}
            onChange={handleChange}
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
            placeholder="리뷰를 수정해주세요."
            id="content"
            value={review.content}
            onChange={handleChange}
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
    </ReviewModifyBlock>
  );
};

export default ReviewModify;

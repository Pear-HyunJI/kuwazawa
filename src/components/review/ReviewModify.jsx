import styled from "styled-components";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { kuwazawa_reviewDB } from "@/assets/firebase";

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
    rating: "",
    content: "",
  };

  const [review, setReview] = useState(initialReviewState);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setReview((prevState) => ({ ...prevState, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const date = new Date().toISOString();
    kuwazawa_reviewDB.child(post.key).update({ ...review, date });
    console.log("post", post);

    // navigate(`/product/${post.productId}`);
    navigate(`/product`);
    // history.goBack();
    // navigate(-1);
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
        <div className="btn">
          <button type="submit">등록</button>
        </div>
      </form>
    </ReviewModifyBlock>
  );
};

export default ReviewModify;

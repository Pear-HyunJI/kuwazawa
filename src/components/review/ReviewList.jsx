import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { fetchReview } from "@/store/board";
import { kuwazawa_reviewDB } from "@/assets/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const ReviewListBlock = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  .content {
    padding: 30px;
  }
  .review {
    padding: 20px;
    border-radius: 10px;
    background-color: #f7f7f7;
    margin-bottom: 20px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  }
  .review p {
    margin: 0;
    padding-bottom: 10px;
  }
  .review p:first-child {
    font-weight: bold;
    font-size: 16px;
  }
  .modify,
  .btn {
    background: #5a4620;
    color: #fff;
    font-size: 15px;
    width: 120px;
    height: 40px;
    margin: 5px;
    text-align: center;
    display: inline-block;
    line-height: 40px;
    text-decoration: none;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .modify:hover,
  .btn:hover {
    background: #3d3115;
  }

  .pagination {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }

  .page-item {
    list-style: none;
    margin: 0 5px;
  }

  .page-link {
    color: #5a4620;
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 5px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin: 5px;
  }

  .page-link:hover {
    background-color: #5a4620;
    color: #fff;
  }

  .page-link.active {
    background-color: #5a4620;
    color: #fff;
  }
`;

const ReviewList = ({ product }) => {
  const navigate = useNavigate();
  const list = useSelector((state) => state.boards.list);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const paginationLength = 5;

  useEffect(() => {
    dispatch(fetchReview());
  }, [dispatch]);

  const onRemove = (e, item) => {
    e.preventDefault();
    kuwazawa_reviewDB.child(item).remove();
    navigate(`/product`);
  };

  const filteredReviews = list.filter(
    (review) => review.productId === product.id
  );

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const lastPage = Math.ceil(filteredReviews.length / reviewsPerPage);

  let startPage, endPage;
  if (lastPage <= paginationLength) {
    startPage = 1;
    endPage = lastPage;
  } else {
    const halfPages = Math.floor(paginationLength / 2);
    if (currentPage <= halfPages) {
      startPage = 1;
      endPage = paginationLength;
    } else if (currentPage + halfPages >= lastPage) {
      startPage = lastPage - paginationLength + 1;
      endPage = lastPage;
    } else {
      startPage = currentPage - halfPages;
      endPage = currentPage + halfPages;
    }
  }

  return (
    <ReviewListBlock>
      <div className="content">
        {currentReviews.length > 0 &&
          currentReviews.map((post, index) => (
            <div key={index} className="review">
              <p>{dayjs(post.date).format("YYYY-MM-DD")}</p>
              <p>
                별점 : {post.rating} | 작성자 : {post.writer}
              </p>
              <p>후기 : {post.content}</p>
              <button className="modify">
                <Link
                  to={`/reviewModify/${post.content}`}
                  state={{ post: post }}
                >
                  리뷰 수정하기
                </Link>
              </button>
              <a
                href="#"
                onClick={(e) => onRemove(e, post.key)}
                className="btn"
              >
                리뷰 삭제하기
              </a>
            </div>
          ))}
      </div>
      <div>
        {filteredReviews.length > 0 && (
          <ul className="pagination">
            <li className="page-item">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="page-link"
              >
                이전
              </button>
            </li>
            {[...Array(endPage - startPage + 1).keys()].map((i) => {
              const pageNumber = i + startPage;
              return (
                <li key={pageNumber} className="page-item">
                  <button
                    onClick={() => paginate(pageNumber)}
                    className={`page-link ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                </li>
              );
            })}
            <li className="page-item">
              <button
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(filteredReviews.length / reviewsPerPage)
                    )
                  )
                }
                className="page-link"
              >
                다음
              </button>
            </li>
          </ul>
        )}
      </div>
    </ReviewListBlock>
  );
};

export default ReviewList;

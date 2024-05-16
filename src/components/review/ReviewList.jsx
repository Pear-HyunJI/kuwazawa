import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { fetchReview } from "@/store/board";
import { kuwazawa_reviewDB } from "@/assets/firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const ReviewListBlock = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  // 별점 정렬 버튼 스타일 추가
  .sortButton {
    display: flex;
    justify-content: left;
    padding-left: 30px;
    margin-bottom: 0px;

    button {
      background-color: transparent;
      color: #333;
      border: none;
      border-bottom: 2px solid transparent;
      padding: 10px 20px;
      font-size: 1rem;
      cursor: pointer;
      transition: border-bottom-color 0.3s ease-in-out;

      &.on {
        border-bottom-color: #5a4620;
      }

      &:hover {
        color: #5a4620;
      }
    }
  }
  .content {
    padding: 30px 30px 0px 30px;
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
  .review img {
    max-width: 100%;
    margin-top: 10px;
    border-radius: 5px;
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
    padding-bottom: 30px;
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
  .slider {
    width: 100%;
    .slick-slide {
      padding: 0 10px; // Add spacing between slides
    }

    margin-bottom: 20px;
  }
  .slick-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 50px;
    color: #000;
  }
  .slick-dots {
  }
`;

const ReviewList = ({ product, showPhotosOnly }) => {
  const navigate = useNavigate();
  const list = useSelector((state) => state.boards.list);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const paginationLength = 5;
  const user = useSelector((state) => state.members.user);
  const [sortOrder, setSortOrder] = useState(""); // 리뷰 정렬 순서 상태

  // 리뷰를 평점에 따라 정렬
  const sortReviews = (order) => {
    const sortedReviews = [...list].sort((a, b) => {
      if (order === "asc") {
        return a.rating.localeCompare(b.rating); // 오름차순
      } else {
        return b.rating.localeCompare(a.rating); // 내림차순
      }
    });
    return sortedReviews;
  };

  // 정렬 순서가 변경될 때마다 리뷰를 정렬하고 업데이트하는 useEffect
  useEffect(() => {
    if (sortOrder !== "") {
      const sortedReviews = sortReviews(sortOrder);
      dispatch({ type: "SET_REVIEWS", payload: sortedReviews }); // 리덕스 스토어 업데이트
    }
  }, [sortOrder, dispatch]);

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

  /// 실제로 정렬된 리뷰를 사용하도록 수정
  let sortedReviews = filteredReviews;
  if (sortOrder !== "") {
    sortedReviews = sortReviews(sortOrder);
  }

  // 포토리뷰만 보기가 활성화되었을 때
  if (showPhotosOnly) {
    sortedReviews = sortedReviews.filter(
      (review) => review.reviewPhotos && review.reviewPhotos.length > 0
    );
  }

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = sortedReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 포토리뷰만 필터링된 리스트의 길이를 기준으로 페이지 계산
  const lastPage = Math.ceil(sortedReviews.length / reviewsPerPage);

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

  const options = {
    dots: true,
    autoplay: false,
    autoplaySpeed: 3000,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: <IoIosArrowDropleftCircle />,
    nextArrow: <IoIosArrowDroprightCircle />,
    responsive: [
      {
        breakpoint: 415,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <ReviewListBlock>
      {/* 별점 정렬 버튼 */}
      <div className="sortButton">
        <button
          onClick={() => setSortOrder("desc")}
          className={sortOrder == "desc" && "on"}
        >
          별점 높은 순
        </button>
        <button
          onClick={() => setSortOrder("asc")}
          className={sortOrder == "asc" && "on"}
        >
          별점 낮은 순
        </button>
      </div>

      <div className="content">
        {currentReviews.length > 0 &&
          currentReviews.map((post, index) => (
            <div key={index} className="review">
              <p>{dayjs(post.date).format("YYYY-MM-DD")}</p>
              <p>
                별점 : {post.rating} | 작성자 : {post.writer}
              </p>
              <p>후기 : {post.content}</p>

              {post.reviewPhotos && post.reviewPhotos.length > 0 && (
                <Slider className="slider" {...options}>
                  {post.reviewPhotos.map((photoURL, idx) => (
                    <div className="slide" key={idx}>
                      <img src={photoURL} alt={`Review ${idx + 1}`} />
                    </div>
                  ))}
                </Slider>
              )}
              {user && user.userId === post.writer && (
                <button className="modify">
                  <Link
                    to={`/reviewModify/${post.content}`}
                    state={{ post: post }}
                  >
                    리뷰 수정하기
                  </Link>
                </button>
              )}
              {user && user.userId == "junhyeok_an@naver.com" && (
                <a
                  href="#"
                  onClick={(e) => onRemove(e, post.key)}
                  className="btn"
                >
                  리뷰 삭제하기
                </a>
              )}
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
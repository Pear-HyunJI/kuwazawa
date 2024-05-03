import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchReview } from '@/store/board';
import { kuwazawa_reviewDB } from '@/assets/firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ReviewListBlock = styled.div`
background: #fff;
border:1px solid #000;
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
  border: 1px solid #5a4620;
  transition: all 0.3s ease;
}

.page-link:hover {
  background-color: #5a4620;
  color: #fff;
}

.page-link:focus {
  outline: none;
}

.page-link.active {
  background-color: #5a4620;
  color: #fff;
}
`;

const ReviewList = () => {
    const navigate = useNavigate();
    const list = useSelector((state) => state.boards.list);
    const dispatch = useDispatch();
    
  
    const [currentPage, setCurrentPage] = useState(1);
    const reviewsPerPage = 4; 
  
    useEffect(() => {
      dispatch(fetchReview());
    }, [dispatch]);
  
    const onRemove = (e, item) => {
      e.preventDefault();
      kuwazawa_reviewDB.child(item).remove();
      navigate(`/product`);
    };
    
  
    const indexOfLastReview = currentPage * reviewsPerPage;
    const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
    const currentReviews = list.slice(indexOfFirstReview, indexOfLastReview);
  
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
    return (
      <ReviewListBlock>
        <div className='content'>
          {currentReviews.length > 0 &&
            currentReviews.map((post, index) => (
              <div key={index} className='review'>
                <p>{dayjs(post.date).format('YYYY-MM-DD')}</p>
                <p>
                  별점 : {post.rating} | 작성자 : {post.writer}
                </p>
                <p>후기 : {post.content}</p>
                <button className='modify'><Link to={`/reviewModify/${post.content}`} state={{ post:post }}>리뷰 수정하기</Link></button>
                <a href='#' onClick={(e) => onRemove(e, post.key)} className='btn'>리뷰 삭제하기</a>
              </div>
            ))}
        </div>
        <div>
          {list.length > 0 && (
            <ul className='pagination'>
              {[...Array(Math.ceil(list.length / reviewsPerPage)).keys()].map(
                (number) => (
                  <li key={number} className='page-item'>
                    <button onClick={() => paginate(number + 1)} className='page-link'>
                    {number + 1}
                    </button>
                  </li>
                )
              )}
            </ul>
          )}
        </div>
      </ReviewListBlock>
    );
  };
  
  export default ReviewList;
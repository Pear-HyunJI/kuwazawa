import React, { useState } from 'react';
import styled from 'styled-components';
import { kuwazawa_reviewDB } from '@/assets/firebase';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ReviewSectionBlock = styled.div`
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

const ReviewSection = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.members.user);
    const [review, setReview] = useState({
        rating: '', 
        content: ''
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setReview((prevReview) => ({ ...prevReview, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const date = new Date().toISOString();
        if (!review.rating) {
            alert('별점을 선택하세요.');
            return;
        }
        if (!review.content) {
            alert('리뷰 내용을 입력하세요.');
            return;
        }
        kuwazawa_reviewDB.push({
            rating: review.rating,
            content: review.content,
            writer: user.userId,
            date: date
        });
        navigate(`/product`)
    };

    return (
        <ReviewSectionBlock>
            <h2>리뷰 작성하기</h2>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="rating">별점주기:</label>
                    <select name="rating" id="rating" value={review.rating} onChange={handleChange}>
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
                    <textarea name="content" placeholder="리뷰를 작성해주세요." id="content" value={review.content} onChange={handleChange}></textarea>
                </div>
                <div className="btn">
                    <button type="submit">등록</button>
                </div>
            </form>
        </ReviewSectionBlock>
    );
};

export default ReviewSection;
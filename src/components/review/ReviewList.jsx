import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { fetchReview } from '@/store/board';
import { kuwazawa_reviewDB } from '@/assets/firebase';
import { useNavigate } from 'react-router-dom';

const ReviewListBlock = styled.div`
    background: #fff;
`;

const ReviewList = ({post}) => {
    const navigate = useNavigate();
    const list = useSelector((state) => state.boards.list);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchReview());
    }, [dispatch]);

    const onRemove = (e) => {
        e.preventDefault();
        kuwazawa_reviewDB.child(post.key).remove();
        navigate("/board");
    };

    return (
        <ReviewListBlock>
            <div>
                {list.length > 0 &&
                    list.map((post) => (
                        <div key={post.id}>
                            <p>별점 : {post.rating}</p>
                            <p>작성자 : {post.writer}</p>
                            <p>후기 : {post.content}</p>
                            <p>{dayjs(post.date).format('YYYY-MM-DD')}</p>
                            <button >리뷰 수정하기</button>
                            <a href="#" onClick={onRemove}>리뷰 삭제하기</a>
                        </div>
                    ))}
            </div>
        </ReviewListBlock>
    );
};

export default ReviewList;
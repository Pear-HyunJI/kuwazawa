import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { kuwazawa_noticeDB } from '@/assets/firebase';

const BoardDetailBlock = styled.div`
    max-width: 800px;
    margin: 0 auto 50px;
    padding: 0 20px;

    h2 {
        border-bottom: 1px solid #ddd;
        padding-bottom: 20px;
        font-size: 24px;
    }

    .name {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 16px;
        margin-bottom: 30px;
    }

    .content {
        background: #f9f9f9;
        border-radius: 8px;
        padding: 20px;
        font-size: 16px;
        line-height: 1.6;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        max-height: 400px;
    }

    .btn {
        text-align: center;
        margin-top: 20px;

        a {
            display: inline-block;
            padding: 12px 24px;
            background: #5A4620;
            color: #fff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 14px;
            transition: background 0.3s;
            margin: 0 10px;
        }

        a:hover {
            background: #3d3115;
        }
    }
`;

const BoardDetail = ({ post }) => {
    const navigate = useNavigate();
    const user = useSelector(state => state.members.user);

    const onRemove = (e) => {
        e.preventDefault();
        kuwazawa_noticeDB.child(post.key).remove();
        navigate("/board");
    };

    useEffect(() => {
        kuwazawa_noticeDB.child(post.key).update({
            hit: post.hit + 1
        });
    }, []);

    return (
        <BoardDetailBlock>
            <h2>{post.subject}</h2>
                    <div className='name'>
                    <p>작성자 : </p>
                    <p style={{fontWeight:'bold'}}>{post.writer}</p> 

                    </div>
                    <div className='content'>
                        <p>
                            {post.content}
                        </p>

                    </div>
            <div className="btn">
                {user && post.writer === user.userId && (
                    <>
                        <Link to={`/boardModify/${post.subject}`} state={{ post: post }}>수정</Link>
                        <a href="#" onClick={onRemove}>삭제</a>
                    </>
                )}
                <Link to="/board">목록</Link>
            </div>
        </BoardDetailBlock>
    );
};

export default BoardDetail;
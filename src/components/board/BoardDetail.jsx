import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { kuwazawa_noticeDB } from '@/assets/firebase';

const BoardDetailBlock = styled.div`
    max-width: 600px; 
    margin: 0 auto 50px; 
    h2{
        border-bottom:1px solid #000;
    }
    .name{
        display:flex;
        justify-content:space-around;
        padding-bottom:30px;
        font-size:20px
    }
    .content{
        background:#fff;
        width:100%;
        height:600px;
        padding:30px;
    }
    .btn { 
        text-align: center; 
        margin-top: 20px;

        a { 
            margin: 0 10px; 
            padding: 10px 20px; 
            background: #ddd;
            font-size: 14px; 
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
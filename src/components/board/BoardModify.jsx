import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { kuwazawa_noticeDB } from '@/assets/firebase';

const BoardModifyBlock = styled.div`
    max-width: 600px; 
    margin: 0 auto 50px; 

    table {
        col:nth-child(1) { width: 100px; }
        col:nth-child(2) { width: auto; }

        td { 
            padding: 5px;

            input { 
                width: 100%; 
                border: 1px solid #ddd; 
                height: 30px; 
                padding: 5px; 
            }

            textarea { 
                width: 100%; 
                border: 1px solid #ddd; 
                padding: 5px; 
                height: 200px; 
            }
        }
    }

    .btn { 
        text-align: center; 
        margin-top: 20px;

        button, a { 
            margin: 0 10px; 
            padding: 10px 20px; 
            background: #ddd;
            font-size: 14px; 
        }
    }
`;

const BoardModify = ({ post }) => {
    const navigate = useNavigate();

    const [board, setBoard] = useState({
        subject: post.subject,
        content: post.content,
        writer: post.writer
    });

    const handleChange = (e) => {
        const { value, name } = e.target;
        setBoard(prevState => ({ ...prevState, [name]: value }));
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const date = new Date().toISOString();
        kuwazawa_noticeDB.child(post.key).update({ ...board, hit: 0, date });
        navigate("/board");
    };

    return (
        <BoardModifyBlock>
            <h2>수정 페이지</h2>
            <form onSubmit={onSubmit}>
                <table border="1">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>작성자</td>
                            <td>
                                <input type="text" name="writer" value={board.writer} disabled />
                            </td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td>
                                <input type="text" name="subject" value={board.subject} onChange={handleChange} />
                            </td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td>
                                <textarea name="content" value={board.content} onChange={handleChange}></textarea>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">글수정</button>
                    <Link to="/board">목록</Link>
                </div>
            </form>
        </BoardModifyBlock>
    );
};

export default BoardModify;
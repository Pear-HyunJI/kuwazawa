import React,{useEffect} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { fetchNotice } from '@/store/board';


const BoardSectionblock = styled.div`
margin:0px 0 50px; 
table{border-bottom:1px solid #000; background:#fff;}
h2{
    font-size:45px;
    text-align: center;
    padding: 50px 0;
}
    table {
        col:nth-child(1) {width:50px }
        col:nth-child(2) {width:auto }
        col:nth-child(3) {width:200px }
        col:nth-child(4) {width:100px }
        col:nth-child(5) {width:100px }
        th { padding:5px }
        td { 
            padding:5px; text-align:center;
            &:nth-child(2) { text-align:left }
        }
    }
    .btn {
        text-align:center; margin:20px 0; 
        a { padding:10px 20px; background:black; color:#fff }
    }
`
const BoardSection = () => {
    const list = useSelector(state => state.boards.list);
    const user = useSelector(state => state.members.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchNotice());
    }, [dispatch]);

    return (
        <BoardSectionblock>
            <h2>공지사항</h2>
            <table>
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>날짜</th>
                        <th>조회수</th>
                    </tr>
                </thead>
                <tbody>
                    {list.length > 0 &&
                        list.map((post, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td><Link to={`/boardDetail/${post.subject}`} state={{ post: post }}>{post.subject}</Link></td>
                                {/* 변수를 넣기 위해서 {}과 백틱``을 사용 */}
                                <td>{post.writer}</td>
                                <td>{dayjs(post.date).format('YYYY-MM-DD')}</td>
                                <td>{post.hit}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            {(user && user.userId === "junhyeok_an@naver.com") &&
                <div className="btn">
                    <Link to="/boardWrite">글쓰기</Link>
                </div>
            }
        </BoardSectionblock>
    );
};

export default BoardSection;
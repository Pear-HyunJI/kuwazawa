import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { fetchNotice } from "@/store/board";
import { useMediaQuery } from "react-responsive";

const BoardSectionBlock = styled.div`
  padding: 0 20px;

  table {
    border-collapse: collapse;
    width: 100%;
    border-bottom: 1px solid #ddd;
    background: #fff;
    th,
    td {
      border: none;
      padding: 20px 10px;
      text-align: left;
    }
    th {
      background: #f2f2f2;
      font-weight: bold;
      color: #333;
    }
    td {
      background: #fafafa;
      color: #666;
      font-size: 16px;
    }
    col:nth-child(1) {
      width: 60px;
    } /* 번호 */
    col:nth-child(2) {
      width: 130px;
    } /* 카테고리 */
    col:nth-child(3) {
      width: auto;
    } /* 제목 */

    col:nth-child(4) {
      width: 130px;
    } /* 날짜 */
    col:nth-child(5) {
      width: 70px;
    } /* 조회수 */
  }
  .btn {
    text-align: center;
    margin: 20px 0;
    a {
      display: inline-block;
      padding: 12px 24px;
      background: #5a4620;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background 0.3s;
      &:hover {
        background: #3d3115;
      }
    }
  }
`;

const MBoardSectionBlock = styled.div`
  background: #fafafa;
  border: 1px solid red;
  max-width: 390px;
  margin: 0 auto;
  .infoWrap {
    display: flex;
  }
`;

const BoardSection = ({ title, boardKeyword }) => {
  const mobile = useMediaQuery({ maxWidth: 412 });
  const list = useSelector((state) => state.boards.list);
  const user = useSelector((state) => state.members.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNotice());
  }, [dispatch]);

  return (
    <>
      {mobile || (
        <BoardSectionBlock>
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
                <th>카테고리</th>
                <th>제목</th>

                <th>날짜</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 &&
                list
                  .filter(
                    (item) =>
                      (title === "all" || item.category === title) &&
                      (boardKeyword === "" ||
                        item.subject.includes(boardKeyword))
                  )
                  .map((post, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{post.category}</td>
                      <td>
                        <Link
                          to={`/boardDetail/${post.subject}`}
                          state={{ post: post }}
                        >
                          {post.subject}
                        </Link>
                      </td>

                      <td>{dayjs(post.date).format("YYYY-MM-DD")}</td>
                      <td>{post.hit}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
          {user && user.userId === "junhyeok_an@naver.com" && (
            <div className="btn">
              <Link to="/boardWrite">글쓰기</Link>
            </div>
          )}
        </BoardSectionBlock>
      )}
      {mobile && (
        <MBoardSectionBlock>
          <div>
            {list.length > 0 &&
              list
                .filter(
                  (item) =>
                    (title === "all" || item.category === title) &&
                    (boardKeyword === "" || item.subject.includes(boardKeyword))
                )
                .map((post, index) => (
                  <div key={index}>
                    <div className="infoWrap">
                      <div>
                        {dayjs(post.date).format("YYYY-MM-DD")}&nbsp;|&nbsp;{" "}
                      </div>
                      <div>{post.category}</div>
                    </div>
                    <div>
                      s
                      <Link
                        to={`/boardDetail/${post.subject}`}
                        state={{ post: post }}
                      >
                        {post.subject}
                      </Link>
                    </div>
                  </div>
                ))}
          </div>
        </MBoardSectionBlock>
      )}
    </>
  );
};

export default BoardSection;

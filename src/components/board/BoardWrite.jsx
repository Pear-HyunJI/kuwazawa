import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { kuwazawa_noticeDB } from "@/assets/firebase";
import dayjs from "dayjs";

const BoardWriteBlock = styled.div`
  padding: 100px 0 20px;
  max-width: 600px;
  margin: 0 auto 50px;
  h2 {
    font-size: 35px;
    color: #5a4620;
    margin-bottom: 80px;
  }
  table {
    col:nth-child(1) {
      width: 100px;
    }
    col:nth-child(2) {
      width: auto;
    }

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
    button,
    a {
      margin: 0 10px;
      padding: 10px 20px;
      background: #ddd;
      font-size: 14px;
    }
  }
`;

const BoardWrite = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.members.user);
  const date = new Date().toISOString();

  const [board, setBoard] = useState({
    category: "notice",
    subject: "",
    content: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setBoard((post) => ({ ...post, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!board.subject) {
      alert("제목을 입력하세요.");
      document.getElementsByName("subject")[0].focus();
      return;
    }
    if (!board.content) {
      alert("내용을 입력하세요.");
      document.getElementsByName("content")[0].focus();
      return;
    }
    kuwazawa_noticeDB.push({
      ...board,
      writer: user.userId,
      hit: 0,
      date: date,
    });
    navigate("/board");
  };

  return (
    <BoardWriteBlock>
      <h2>공지사항 작성하기</h2>
      <form onSubmit={onSubmit}>
        <table border="1">
          <colgroup>
            <col />
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td>카테고리</td>
              <td colspan="2">
                <select
                  name="category"
                  value={board.category}
                  onChange={handleChange}
                >
                  <option value="notice">notice</option>
                  <option value="event">event</option>
                  <option value="update">update</option>
                  <option value="service">service</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>작성자</td>
              <td>
                <input type="text" name="writer" value={user.userId} disabled />
              </td>
              <td>
                {/* <input type="text" name="date" value={date} disabled /> */}
                <input
                  type="text"
                  name="date"
                  value={dayjs(date).format("YYYY-MM-DD")}
                  disabled
                />
              </td>
            </tr>
            <tr>
              <td>제목</td>
              <td colspan="2">
                <input
                  type="text"
                  name="subject"
                  value={board.subject}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>내용</td>
              <td colspan="2">
                <textarea
                  name="content"
                  value={board.content}
                  onChange={handleChange}
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn">
          <button type="submit">작성</button>
          <Link to="/board">목록</Link>
        </div>
      </form>
    </BoardWriteBlock>
  );
};

export default BoardWrite;

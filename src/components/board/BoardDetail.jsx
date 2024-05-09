import React, { useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { kuwazawa_noticeDB } from "@/assets/firebase";
import dayjs from "dayjs";

const BoardDetailBlock = styled.div`
  max-width: 800px;
  margin: 0 auto 50px;
  padding: 100px 0 20px;

  h2 {
    padding-bottom: 20px;
    font-size: 24px;
  }
  .hitWrap {
    text-align: right;
    padding: 5px 10px;
  }

  .wrap {
    border-top: 1px solid #bababa;
    display: flex;
    padding: 20px 10px 0;
    .element {
      flex: 40%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 16px;
      margin-bottom: 30px;
      .name {
        padding-right: 40px;
      }
      .date {
        padding-left: 40px;
      }
    }
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
      background: #5a4620;
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
  @media screen and (max-width: 412px) {
    max-width: 380px;
    .wrap {
      display: block;
      .element {
        display: block;
        .name {
          padding-right: 0;
        }
        .date {
          padding-left: 0;
        }
      }
    }
  }
`;

const BoardDetail = ({ post }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.members.user);

  const onRemove = (e) => {
    e.preventDefault();
    kuwazawa_noticeDB.child(post.key).remove();
    navigate("/board");
  };

  useEffect(() => {
    kuwazawa_noticeDB.child(post.key).update({
      hit: post.hit + 1,
    });
  }, []);

  return (
    <BoardDetailBlock>
      <h2>{post.subject}</h2>
      <div className="hitWrap">
        <p className="hit">조회수 {post.hit}</p>
      </div>
      <div className="wrap">
        <div className="element">
          <p>작성자 : </p>
          <p className="name" style={{ fontWeight: "bold" }}>
            {post.writer}
          </p>
        </div>
        <div className="element">
          <p className="date">게시일 :</p>
          <p style={{ fontWeight: "bold" }}>
            {dayjs(post.date).format("YYYY-MM-DD")}
          </p>
        </div>
      </div>

      <div className="content">
        <p>{post.content}</p>
      </div>
      <div className="btn">
        {user && post.writer === user.userId && (
          <>
            <Link to={`/boardModify/${post.subject}`} state={{ post: post }}>
              수정
            </Link>
            <a href="#" onClick={onRemove}>
              삭제
            </a>
          </>
        )}
        <Link to="/board">목록</Link>
      </div>
    </BoardDetailBlock>
  );
};

export default BoardDetail;

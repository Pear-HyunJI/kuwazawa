import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { kuwazawa_memberDB } from "@/assets/firebase";
import { fetchMembers } from "@/store/member";

const JoinSectionBlock = styled.div`
  .header {
    color: #5a4620;
    text-align: center;
    padding: 100px 0;
  }
  h2 {
    font-size: 35px;
  }
  max-width: 600px;
  margin: 50px auto;
  table {
    col:nth-child(1) {
      width: 150px;
    }
    col:nth-child(2) {
      width: auto;
    }
    td {
      padding: 5px;
      &:nth-child(1) {
        text-align: right;
      }
      input {
        border: 1px solid #ddd;
        height: 30px;
        width: 100%;
        text-indent: 1em;
      }
    }
  }
  .btn {
    text-align: center;
    margin-top: 20px;
    button {
      padding: 10px;
      background: #5a4620;
      color: #fff;
    }
  }
`;

const JoinSection = () => {
  const dispatch = useDispatch();
  // store의 index.js의 members의 members[]
  const members = useSelector((state) => state.members.members);

  const navigate = useNavigate();
  const userIdRef = useRef("");
  const userPwRef = useRef("");
  const userPwOkRef = useRef("");

  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");
  const [userPwOk, setUserPwOk] = useState("");

  const onJoin = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("이메일을 입력하세요.");
      userIdRef.current.focus();
      return;
    }
    if (!userPw) {
      alert("비밀번호를 입력하세요.");
      userPwRef.current.focus();
      return;
    }
    if (!userPwOk) {
      alert("비밀번호를 입력하세요.");
      userPwOkRef.current.focus();
      return;
    }
    if (userPw != userPwOk) {
      alert("비밀번호가 일치하지 않습니다.");
      userPwRef.current.focus();
      return;
    }

    if (!idCheck(userId)) {
      return false;
    }

    const addMember = { userId: userId, userPw: userPw };
    try {
      await kuwazawa_memberDB.push(addMember);
      alert("회원가입이 성공했습니다.");
      navigate("/login");
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  const idCheck = (value) => {
    let duplicate = members.find((item) => item.userId == value);
    console.log(duplicate);
    if (duplicate) {
      alert("중복된 아이디입니다.");
      userIdRef.current.focus();
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  return (
    <JoinSectionBlock>
      <div className="header">
        <h2>CONTACT</h2>
        <p>회원가입을 해주세요.</p>
      </div>
      <form onSubmit={onJoin}>
        <table border="0">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <label htmlFor="userId">이메일 : </label>
              </td>
              <td>
                <input
                  type="text"
                  name="userId"
                  id="userId"
                  ref={userIdRef}
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                    idCheck(e.target.value);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userPw">비밀번호 : </label>
              </td>
              <td>
                <input
                  type="password"
                  name="userPw"
                  id="userPw"
                  ref={userPwRef}
                  value={userPw}
                  onChange={(e) => setUserPw(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userPwOk">비밀번호확인 : </label>
              </td>
              <td>
                <input
                  type="password"
                  name="userPwOk"
                  id="userPwOk"
                  ref={userPwOkRef}
                  value={userPwOk}
                  onChange={(e) => setUserPwOk(e.target.value)}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn">
          <button type="submit">회원가입</button>
        </div>
      </form>
    </JoinSectionBlock>
  );
};

export default JoinSection;

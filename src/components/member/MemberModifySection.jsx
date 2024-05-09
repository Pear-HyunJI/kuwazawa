import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, updateMember } from "@/store/member"; // updateMember 가져오기

const MemberModifySectionBlock = styled.div`
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
        width: 70%;
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

const MemberModifySection = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) =>
    state.members.members.find((m) => m.id === userId)
  );

  const userPwRef = useRef("");
  const userPwOkRef = useRef("");

  const [userPw, setUserPw] = useState("");
  const [userPwOk, setUserPwOk] = useState("");

  const onModify = async (e) => {
    e.preventDefault();
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
    if (userPw !== userPwOk) {
      alert("비밀번호가 일치하지 않습니다.");
      userPwRef.current.focus();
      return;
    }

    try {
      await dispatch(updateMember(userId, { userPw })); // updateMember 액션 사용
      alert("회원 정보가 수정되었습니다.");
      navigate("/login");
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  return (
    <MemberModifySectionBlock>
      <div className="header">
        <h2>회원 정보 수정</h2>
        <p>회원 정보를 수정하세요.</p>
      </div>
      <form onSubmit={onModify}>
        <table border="0">
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
              <td>
                <label htmlFor="userPw">새로운 비밀번호 : </label>
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
                <label htmlFor="userPwOk">비밀번호 확인 : </label>
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
          <button type="submit">수정 완료</button>
        </div>
      </form>
    </MemberModifySectionBlock>
  );
};

export default MemberModifySection;
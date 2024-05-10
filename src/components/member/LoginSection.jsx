import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { fetchMembers, userLogin } from "@/store/member";
import { fetchCarts } from "@/store/product";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginSectionBlock = styled.div`
  max-width: 600px;

  margin: 0px auto;
  text-align: left;
  h2 {
    padding-top: 60px;
    font-size: 35px;
    color: #5a4620;
    margin-bottom: 50px;
    text-align: center;
  }
  .loginWrap {
    padding: 50px;
    border: 2px solid #5a462030;
    table {
      padding: 50px;

      col:nth-child(1) {
        width: 100%;
      }
      col:nth-child(2) {
        width: auto;
      }
      tr {
        // width: 500px;
        margin: auto;
        display: flex;
        flex-direction: column;
        padding: 5px;
        td {
          padding: 5px;
          &:nth-child(1) {
            display: flex;
            text-align: left;
          }
          input {
            border: 1px solid #ddd;
            border-radius: 5px;
            height: 40px;
            width: 100%;

            text-indent: 1em;
          }
        }
      }
    }
    .btn {
      text-align: center;
      margin-top: 20px;
      button {
        width: 96%;
        border-radius: 5px;
        padding: 10px 0;
        background: #5a462030;
        color: #5a462099;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
  @media screen and (max-width: 412px) {
    max-width: 380px;
    h2 {
      padding-top: 80px;
      font-size: 35px;
      color: #5a4620;
      margin-bottom: 20px;
      text-align: center;
    }
    .joinWrap {
      padding: 10px;
    }
  }
`;

const LoginSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const userIdRef = useRef("");
  const userPwRef = useRef("");

  const previousUrl = sessionStorage.getItem("previousUrl");
  const choiceProduct = sessionStorage.getItem("choiceProduct");

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  const handleLogin = (e) => {
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
    let findUser = members.find((item) => item.userId == userId); // { userId:"", userPw:""}
    if (findUser) {
      if (findUser.userPw != userPw) {
        alert("비밀번호가 틀렸습니다.");
        userPwRef.current.focus();
        return false;
      } else {
        dispatch(userLogin({ findUser }));
        dispatch(fetchCarts());
        if (previousUrl == "/payment") {
          navigate(previousUrl, { state: JSON.parse(choiceProduct) });
          sessionStorage.removeItem("previousUrl");
        } else if (previousUrl == "/product" || previousUrl == "/cart") {
          navigate(previousUrl);
          sessionStorage.removeItem("previousUrl");
        } else {
          navigate("/");
        }
        console.log("유저", members.user);
      }
    } else {
      alert("회원이 아닙니다.");
      userIdRef.current.focus();
      return false;
    }
  };

  return (
    <LoginSectionBlock>
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div className="loginWrap">
          <table>
            <colgroup>
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="userId">이메일: </label>
                </td>
                <td>
                  <input
                    ref={userIdRef}
                    type="text"
                    id="userId"
                    name="userId"
                    placeholder="이메일을 입력해 주세요."
                    onChange={(e) => setUserId(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="userPw">비밀번호: </label>
                </td>
                <td>
                  <input
                    ref={userPwRef}
                    type="password"
                    id="userPw"
                    name="userPw"
                    placeholder="비밀번호를 입력해 주세요."
                    onChange={(e) => setUserPw(e.target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn">
            <button type="submit">로그인</button>
          </div>
        </div>
      </form>
    </LoginSectionBlock>
  );
};

export default LoginSection;

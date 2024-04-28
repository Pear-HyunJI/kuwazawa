import React from "react";
import styled from "styled-components";

const LoginSectionBlock = styled.div`
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
const Login = () => {
  return (
    <LoginSectionBlock className="row">
      <div className="header">
        <h2>CONTACT</h2>
        <p>로그인 해주세요.</p>
      </div>
      <form>
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
                <input type="text" />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="userPw">비밀번호: </label>
              </td>
              <td>
                <input type="password" />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="btn">
          <button type="submit">확인</button>
        </div>
      </form>
    </LoginSectionBlock>
  );
};

export default Login;

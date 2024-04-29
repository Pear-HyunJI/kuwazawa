import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import { fetchMembers, userLogin } from '@/store/member'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

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
const Login = () => {
  const navigate = useNavigate()
    const dispatch = useDispatch()
    const members = useSelector(state=>state.members.members)
    const [userId, setUserId] = useState("")
    const [userPw, setUserPw] = useState("")

    const userIdRef = useRef("")
    const userPwRef = useRef("")

    useEffect(()=>{
        dispatch(fetchMembers())
    }, [])

    const handleLogin = (e)=>{
        e.preventDefault()
        if (!userId) {
            alert("이메일을 입력하세요.")
            userIdRef.current.focus()
            return
        }
        if (!userPw) {
            alert("비밀번호를 입력하세요.")
            userPwRef.current.focus()
            return
        }
        let findUser = members.find(item=>item.userId==userId)  // { userId:"", userPw:""}
        if (findUser) {
            if (findUser.userPw!=userPw) {
                alert("비밀번호가 틀렸습니다.")
                userPwRef.current.focus()
                return false
            } else {
                dispatch(userLogin(findUser))
                navigate('/')
            }
        } else {
            alert("회원이 아닙니다.")
            userIdRef.current.focus()
            return false
        }
    }
  return (
    <LoginSectionBlock className="row">
      <div className="header">
        <h2>CONTACT</h2>
        <p>로그인 해주세요.</p>
      </div>
      <form  onSubmit={handleLogin}>
        <table>
          <colgroup>
            <col />
            <col />
          </colgroup>
          <tbody>
            <tr>
            <td><label htmlFor="userId">이메일: </label></td>
            <td><input ref={userIdRef} type="text" id="userId" name="userId" onChange={ (e)=>setUserId(e.target.value)} /></td>
            </tr>
            <tr>
            <td><label htmlFor="userPw">비밀번호: </label></td>
            <td><input ref={userPwRef} type="password" id="userPw" name="userPw" onChange={ (e)=>setUserPw(e.target.value) } /></td>
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

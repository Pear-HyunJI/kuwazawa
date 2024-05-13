import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { kuwazawa_memberDB } from "@/assets/firebase";
import { useNavigate } from "react-router-dom";
import { fetchMembers } from "@/store/member";
import { useDispatch, useSelector } from "react-redux";

const JoinSectionBlock = styled.div`
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
  .joinWrap {
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
            p {
              color: red;
            }
            label {
            }
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
        background: #5A4620;
        color: #fff;
        font-size: 20px;
        font-weight: bold;
        &:hover{ background: #3d3115;}
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

const JoinSection = () => {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.members.members);

  const navigate = useNavigate();
  const userIdRef = useRef("");
  const userPwRef = useRef("");
  const userPwOkRef = useRef("");
  const mZipcodeRef = useRef("");
  const mAddressRef = useRef("");
  const mAddressSubRef = useRef("");
  const [userInfo, setUserInfo] = useState({
    userId: "",
    userPw: "",
    userPwOk: "",
    userIrum: "",
    handphone: "",
    zipCode: "",
    addr1: "",
    addr2: "",
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const register = async (e) => {
    e.preventDefault();
    if (!userInfo.userId) {
      alert("이메일을 입력하세요.");
      userIdRef.current.focus();
      return;
    }
    if (!userInfo.userPw) {
      alert("비밀번호를 입력하세요.");
      userPwRef.current.focus();
      return;
    }
    if (!userInfo.userPwOk) {
      alert("비밀번호를 입력하세요.");
      userPwOkRef.current.focus();
      return;
    }
    if (userInfo.userPw != userInfo.userPwOk) {
      alert("비밀번호가 일치하지 않습니다.");
      userPwRef.current.focus();
      return;
    }

    if (!idCheck(userInfo.userId)) {
      return false;
    }

    const addMember = {
      mid: Date.now(),
      userId: userInfo.userId,
      userPw: userInfo.userPw,
      userIrum: userInfo.userIrum,
      handphone: userInfo.handphone,
      zipCode: userInfo.zipCode,
      addr1: userInfo.addr1,
      addr2: userInfo.addr2,
    };
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

  useEffect(() => {
    window.openDaumPostcode = () => {
      new window.daum.Postcode({
        oncomplete: (data) => {
          let fullAddr = ""; // 최종 주소 변수
          let extraAddr = ""; // 조합형 주소 변수
          if (data.userSelectedType === "R") {
            // 사용자가 도로명 주소를 선택했을 경우
            fullAddr = data.roadAddress;
          } else {
            // 사용자가 지번 주소를 선택했을 경우(J)
            fullAddr = data.jibunAddress;
          }
          if (data.userSelectedType === "R") {
            if (data.bname !== "") {
              extraAddr += data.bname;
            }
            if (data.buildingName !== "") {
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            }
            fullAddr += extraAddr !== "" ? " (" + extraAddr + ")" : "";
          }
          // 주소 정보를 입력 요소에 설정
          setUserInfo((prevState) => ({
            ...prevState,
            zipCode: data.zonecode,
            addr1: fullAddr,
          }));
          mAddressSubRef.current.focus();
        },
      }).open();
    };
  }, []);

  return (
    <JoinSectionBlock>
      <h2>Join</h2>
      <form onSubmit={register}>
        <div className="joinWrap">
          <table border="0">
            <colgroup>
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="userId">E-mail</label>
                  <p>*</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    ref={userIdRef}
                    value={userInfo.userId}
                    placeholder="이메일을 입력해 주세요."
                    onChange={(e) => {
                      handleChange(e);
                      idCheck(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="userPw">Password </label>
                  <p>*</p>
                </td>
                <td>
                  <input
                    type="password"
                    name="userPw"
                    id="userPw"
                    ref={userPwRef}
                    value={userInfo.userPw}
                    placeholder="비밀번호를 입력해 주세요."
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    name="userPwOk"
                    id="userPwOk"
                    ref={userPwOkRef}
                    value={userInfo.userPwOk}
                    placeholder="비밀번호를 한번 더 입력해 주세요."
                    onChange={handleChange}
                    style={{ marginTop: "5px" }}
                  />
                </td>
              </tr>
              {/* <tr>
                <td>
                  <label htmlFor="userPwOk">비밀번호확인 </label>
                </td>
                <td>
                  <input
                    type="password"
                    name="userPwOk"
                    id="userPwOk"
                    ref={userPwOkRef}
                    value={userInfo.userPwOk}
                    onChange={handleChange}
                  />
                </td>
              </tr> */}
              <tr>
                <td>
                  <label htmlFor="userIrum">Name </label>
                  <p>*</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="userIrum"
                    id="userIrum"
                    value={userInfo.userIrum}
                    placeholder="이름을 입력해 주세요."
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="handphone">Mobile number</label>
                  <p>*</p>
                </td>
                <td>
                  <input
                    type="text"
                    name="handphone"
                    id="handphone"
                    value={userInfo.handphone}
                    placeholder="휴대폰번호를 입력해 주세요."
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td rowSpan="3">
                  <label htmlFor="addr1">Address</label>
                </td>
                <td>
                  <button
                    type="button"
                    onClick={window.openDaumPostcode}
                    style={{
                      height: "30px",
                      verticalAlign: "middle",
                      padding: "0 5px",
                      marginRight: "5px",
                    }}
                  >
                    우편번호
                  </button>
                  <input
                    style={{ width: "150px" }}
                    type="text"
                    name="zipCode"
                    id="zipCode"
                    ref={mZipcodeRef}
                    value={userInfo.zipCode}
                    onChange={handleChange}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="addr1"
                    id="addr1"
                    ref={mAddressRef}
                    value={userInfo.addr1}
                    onChange={handleChange}
                    readOnly
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="text"
                    name="addr2"
                    id="addr2"
                    ref={mAddressSubRef}
                    value={userInfo.addr2}
                    placeholder="상세주소를 입력해주세요."
                    onChange={handleChange}
                    style={{ marginTop: "-15px" }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btn">
            <button type="submit">Sign Up</button>
          </div>
        </div>
      </form>
    </JoinSectionBlock>
  );
};

export default JoinSection;

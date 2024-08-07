import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { kuwazawa_memberDB, kuwazawa_cartDB } from "@/assets/firebase";
import { useNavigate } from "react-router-dom";
import { fetchMembers, localUser, userLogout } from "@/store/member";
import { fetchCarts } from "@/store/product";

const MemberModifySectionBlock = styled.div`
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
  .memberModifyWrap {
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
        width: 150px;
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
    .memberModifyWrap {
      padding: 10px;
      .btn {
        button {
          font-size: 15px;
        }
      }
    }
  }
`;

const MemberModifySection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.members.user);

  const userIdRef = useRef("");
  const userPwRef = useRef("");
  const userPwOkRef = useRef("");
  const mZipcodeRef = useRef("");
  const mAddressRef = useRef("");
  const mAddressSubRef = useRef("");

  const [userInfo, setUserInfo] = useState({
    userId: user.userId,
    userPw: "",
    userPwOk: "",
    userIrum: user.userIrum,
    handphone: user.handphone,
    zipCode: user.zipCode,
    addr1: user.addr1,
    addr2: user.addr2,
  });

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserInfo((userInfo) => ({ ...userInfo, [name]: value }));
  };

  const modify = async (e) => {
    e.preventDefault();
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
    try {
      await kuwazawa_memberDB.child(user.key).update(userInfo);
      dispatch(fetchMembers());
      dispatch(localUser(JSON.parse(localStorage.getItem("loging"))));
      alert("회원정보를 수정했습니다.");
      navigate("/");
    } catch (error) {
      console.log("오류 : ", error);
    }
  };

  const memberRemove = async (e) => {
    e.preventDefault();
    const answer = confirm("정말로 탈퇴하시겠습니까?");
    if (answer) {
      try {
        await kuwazawa_cartDB.child(user.key).remove();
        await kuwazawa_memberDB.child(user.key).remove();
        dispatch(userLogout());
        dispatch(fetchCarts());
        navigate("/");
      } catch (error) {
        console.log("오류 : ", error);
      }
    } else {
      return;
    }
  };

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
            addr2: "",
          }));
          mAddressSubRef.current.focus();
        },
      }).open();
    };
  }, []);

  return (
    <MemberModifySectionBlock>
      <h2>회원정보 수정</h2>

      <form onSubmit={modify}>
        <div className="memberModifyWrap">
          <table border="0">
            <colgroup>
              <col />
              <col />
            </colgroup>
            <tbody>
              <tr>
                <td>
                  <label htmlFor="userId">이메일</label>
                </td>
                <td>
                  <input
                    type="text"
                    name="userId"
                    id="userId"
                    ref={userIdRef}
                    value={userInfo.userId}
                    disabled
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="userPw">비밀번호</label>
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
              <tr>
                <td>
                  <label htmlFor="userIrum">이름 : </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="userIrum"
                    id="userIrum"
                    value={userInfo.userIrum}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label htmlFor="handphone">휴대폰번호 : </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="handphone"
                    id="handphone"
                    value={userInfo.handphone}
                    onChange={handleChange}
                  />
                </td>
              </tr>
              <tr>
                <td rowSpan="3">
                  <label htmlFor="addr1">주소 : </label>
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
            <button type="submit">회원정보수정</button>
            <button
              type="button"
              onClick={memberRemove}
              style={{ marginLeft: "20px" }}
            >
              회원탈퇴
            </button>
          </div>
        </div>
      </form>
    </MemberModifySectionBlock>
  );
};

export default MemberModifySection;

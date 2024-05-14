import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PaymentSectionBlock = styled.div`
@media (max-width: 768px){
  padding:5px;
}`

const Step1Block = styled.div`
  width: 100%;
  margin: 0 auto;
  background-color: #fbfbfb;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  border-radius: 16px;
  margin-bottom: 40px;

  h2 {
    margin-bottom: 24px;
    color: #333333;
    font-size: 1.5rem;
    font-weight: bold;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 24px;

    th,
    td {
      padding: 16px;
      border: none;
      border-bottom: 1px solid #e0e0e0;
      text-align: left;
      span{
        display:block
      }
    }
  }

  th {
    background-color: #f5f5f5;
    font-weight: bold;
  }

  .orderList th:nth-child(1),
  .orderList td:nth-child(1) {
    width: auto;
  }

  .customerInfo td:nth-child(1) {
    width: 150px;
  }

  input[type='text'],
  input[type='radio'] + span {
    margin-right: 16px;
    height: 40px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 0 16px;
    width: 100%;
    max-width: 400px;
    font-size: 1rem;
    color: #333333;
    background-color: #ffffff;
    transition: border-color 0.3s ease;

    &:focus {
      outline: none;
      border-color: #4684f0;
    }
  }
 
`;

const Step2Block = styled.div`
width: 100%;
  margin: 0 auto;
  background-color: #fbfbfb;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  border-radius:15px;
  h2 {
    margin-bottom: 20px;
  }

  table {
    width: 85%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
      padding: 10px;
      border: 1px solid #ddd;
    }
  }

  .orderList th:nth-child(1),
  .orderList td:nth-child(1) {
    width: auto;
  }

  .customerInfo td:nth-child(1) {
    width: 150px;
  }

  input[type="text"], input[type="radio"] + span {
    margin-right: 20px;
    height: 30px;
    border: 1px solid #ddd;
    padding-left: 10px;
    width:85%;
  }

  .buttons {
    text-align: center;
    margin-top: 20px;
    a {
      display: inline-block;
      padding: 10px;
      background: #5A4620;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: all 0.3s;
      &:hover{background:#3d3115;}
    }
  }
  @media (max-width: 768px){
  }
`;
  

const PaymentSection = ({ product }) => {
  const user = useSelector((state) => state.members.user);
  const [deliveryFee, setDeliveryFee] = useState(700); // 배송비 기본값 설정
  const [total, setTotal] = useState(0); // 총 주문 금액
  const [totalDeliveryPrice, setTotalDeliveryPrice] = useState(0); // 총 주문 금액 + 배송비
  

  useEffect(() => {
    const totalPrice = product.reduce(
      (acc, item) => acc + parseInt(item.product.price) * parseInt(item.qty),
      0
    );
    setTotal(totalPrice);

    if (totalPrice >= 5000) {
      setDeliveryFee(0);
    } else {
      setDeliveryFee(700);
    }

    setTotalDeliveryPrice(totalPrice + deliveryFee);
    const totalDeliveryPrice = total >= 5000 ? total : total + 700;
  }, [product]);

  const mZipcodeRef = useRef("");
  const mAddressRef = useRef("");
  const mAddressSubRef = useRef("");

  const [userInfo, setUserInfo] = useState({
    userId: user.userId,
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

  const [placeType, setPlaceType] = useState("default");
  const placeTypeChange = (type) => {
    setPlaceType(type);
  };

  const onReset = (type) => {
    if (type == "default") {
      setUserInfo({
        userId: user.userId,
        userIrum: user.userIrum,
        handphone: user.handphone,
        zipCode: user.zipCode,
        addr1: user.addr1,
        addr2: user.addr2,
      });
    } else {
      setUserInfo({
        userId: "",
        userIrum: "",
        handphone: "",
        zipCode: "",
        addr1: "",
        addr2: "",
      });
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
          }));
          mAddressSubRef.current.focus();
        },
      }).open();
    };
  }, []);

  return (
    <PaymentSectionBlock>
      <Step1Block>
        <h2>STEP1. 주문하시는 상품</h2>
        <p style={{color:"#adadad"}}>5000&yen; 이상 구매시 배달비 무료</p>
        <table className="orderList">
          <thead>
            <tr>
              <th style={{textAlign:"center"}}>상품명</th>
              <th style={{textAlign:"center"}}>주문금액</th>
              <th style={{textAlign:"center"}}>배송비</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.product.photo} alt={item.product.name} />
                  {item.product.name} 
                  <span>수량 : {item.qty}개</span>
                  <span>가격 :{" "}{parseInt(item.product.price).toLocaleString()}&yen;</span>
                </td>
                <td style={{ textAlign: "center" }}>
                  {(
                    parseInt(item.qty) * parseInt(item.product.price)
                  ).toLocaleString()}
                  &yen;
                </td>
                <td style={{ textAlign: "center" }}>{deliveryFee}&yen;</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="3" style={{borderBottom:"0px"}} >
                <div style={{display:"flex", justifyContent:"space-around"}}>
                  <div>
                    <p>주문금액</p>
                    <p>{total.toLocaleString()}&yen;</p>
                  </div>
                  <div style={{ fontSize: "30px" }}>+</div>
                  <div>
                    <p>배송비</p>
                    <p>{deliveryFee}&yen;</p>
                  </div>
                  <div style={{ fontSize: "30px" }}>=</div>
                  <div>
                    <p>총 주문금액</p>
                    <p>{totalDeliveryPrice.toLocaleString()}&yen;</p>
                  </div>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </Step1Block>
      <Step2Block>
        <h2>STEP2. 주문고객/배송지 정보</h2>
        <table className="customerInfo" border="1">
          <tbody>
            <tr>
              <td>주문하시는 분</td>
              <td>주문하시는 분의 정보를 입력하는 곳입니다.(<span>*</span>는 필수)</td>
            </tr>
            <tr>
              <td>주문지 선택</td>
              <td>
                <input
                  type="radio"
                  name="placeType"
                  value="default"
                  onClick={() => {
                    onReset("default");
                    placeTypeChange("default");
                  }}
                  checked={placeType == "default"}
                />{" "}
                <span>기본주소(회원정보)</span>
                <input
                  type="radio"
                  name="placeType"
                  value="self"
                  onClick={() => {
                    onReset("self");
                    placeTypeChange("self");
                  }}
                  checked={placeType == "self"}
                />{" "}
                <span>새로입력</span>
              </td>
            </tr>
            <tr>
              <td>이름</td>
              <td>
                <input type="text" value={userInfo.userIrum} />
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
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>휴대전화</td>
              <td>
                <input
                  type="text"
                  name="handphone"
                  value={userInfo.handphone}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td>이메일</td>
              <td>
                <input
                  type="text"
                  name="userId"
                  value={userInfo.userId}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="buttons">
          <Link to="/paymentFinish" state={{ product }}>
            결제하기
          </Link>
        </div>
      </Step2Block>
    </PaymentSectionBlock>
  );
};

export default PaymentSection;
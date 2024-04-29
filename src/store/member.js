import { createSlice } from "@reduxjs/toolkit";
import { kuwazawa_memberDB } from "@/assets/firebase";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    user: null,
    manager: false,
  },
  reducers: {
    initMembers(state, action) {
      state.members = action.payload;
    },
    userLogin(state, action) {
      state.user = action.payload;
      //사용자가 페이지를 새로고침하거나 브라우저를 닫은 후에도 사용자 정보를 유지
      localStorage.loging = JSON.stringify(action.payload);
      if (action.payload.userId == "junhyeok_an@naver.com") {
        localStorage.manager = JSON.stringify(true);
        state.manager = true;
      } else {
        localStorage.manager = JSON.stringify(false);
        state.manager = false;
      }
    },
    userLogout(state, action) {
      state.user = action.payload;
      state.manager = false;
      localStorage.clear();
    },
  },
});

export const { initMembers, userLogin, userLogout } = memberSlice.actions;
// firebase에서 회원정보를 불러와서 store에 저장
export const fetchMembers = () => async (dispatch) => {
  try {
    // 함수 내부에서는 .on('value', ...) => Firebase 데이터베이스에서 회원 정 변경이 있을 때마다 해당 정보를 가져옴.
    kuwazawa_memberDB.on("value", (membersSnapshot) => {
      const membersObj = membersSnapshot.val();
      const membersArr = Object.values(membersObj);
      dispatch(initMembers(membersArr));
    });
  } catch (error) {
    console.error(error);
  }
};
export default memberSlice.reducer;

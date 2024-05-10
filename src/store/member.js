import { createSlice } from "@reduxjs/toolkit";
import { kuwazawa_memberDB } from "@/assets/firebase";

const memberSlice = createSlice({
  name: "member",
  initialState: {
    members: [],
    user: null,
  },
  reducers: {
    initMembers(state, action) {
      state.members = action.payload;
    },
    userLogin(state, action) {
      const {
        key,
        userId,
        userIrum,
        userPw,
        handphone,
        addr1,
        addr2,
        zipCode,
      } = action.payload.findUser;

      state.user = {
        key,
        userId,
        userIrum,
        userPw,
        handphone,
        addr1,
        addr2,
        zipCode,
      };
      localStorage.loging = JSON.stringify({ key: key, userId: userId });
    },
    localUser(state, action) {
      const findUser = state.members.find(
        (item) => item.key == action.payload.key
      );
      state.user = findUser;
    },
    userLogout(state, action) {
      state.user = null;
      localStorage.clear();
    },
  },
});

export const { initMembers, userLogin, userLogout, localUser } =
  memberSlice.actions;
// firebase에서 회원정보를 불러와서 store에 저장
export const fetchMembers = () => async (dispatch) => {
  try {
    kuwazawa_memberDB.on("value", (snapshot) => {
      const membersObj = snapshot.val();
      const membersArr = Object.entries(membersObj).map(([key, value]) => {
        return { key: key, ...value };
      });
      dispatch(initMembers(membersArr));
    });
  } catch (error) {
    console.error("오류:", error);
  }
};

export default memberSlice.reducer;

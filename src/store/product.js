import { createSlice } from "@reduxjs/toolkit";
import { kuwazawa_productDB, kuwazawa_cartDB } from "@/assets/firebase";

const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    carts: [],
    cartsCount: 0,
  },
  reducers: {
    initProducts(state, action) {
      state.products = action.payload;
    },
    initCarts(state, action) {
      state.carts = action.payload;
      state.cartsCount = action.payload.length;
    },
  },
});

export const { initProducts, initCarts } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    kuwazawa_productDB.on("value", (snapshot) => {
      const productsObj = snapshot.val();
      const productsArr = Object.entries(productsObj).map(([key, value]) => {
        return { key: key, ...value };
      });
      dispatch(initProducts(productsArr));
    });
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

export const fetchCarts = () => async (dispatch, getState) => {
  const user = getState().members.user;
  if (user) {
    try {
      const snapshot = await kuwazawa_cartDB.once("value");
      if (snapshot.val()) {
        const cartsObj = snapshot.val();
        if (cartsObj) {
          const cartsArr = Object.entries(cartsObj).map(([key, value]) => {
            return { key: key, ...value }; // 키와 값 모두 포함한 객체 생성
          });
          const userCarts = cartsArr.find((item) => item.key == user.key);
          if (userCarts) {
            const userCartsArr = Object.entries(userCarts).map(
              ([key, value]) => {
                return { key: key, ...value };
              }
            );
            const userCartsArrNotFirst = userCartsArr.filter(
              (item, key) => key !== 0
            );
            dispatch(initCarts(userCartsArrNotFirst));
          } else {
            dispatch(initCarts([]));
          }
        } else {
          dispatch(initCarts([]));
        }
      } else {
        dispatch(initCarts([]));
      }
    } catch (error) {
      console.error("Error fetching carts:", error);
    }
  } else {
    dispatch(initCarts([]));
  }
};

export default productSlice.reducer;

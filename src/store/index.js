import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./member";
import productReducer from './product'

const store = configureStore({
  reducer: {
    members: memberReducer,
    products : productReducer
  },
});

export default store;

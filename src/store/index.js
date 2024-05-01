import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./member";
import productReducer from './product'
import boardReducer from './board'

const store = configureStore({
  reducer: {
    members: memberReducer,
    products : productReducer,
    boards : boardReducer
  },
});

export default store;

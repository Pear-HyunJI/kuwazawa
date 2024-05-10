import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/store/index.js";
import { fetchNotice, fetchReview } from "@/store/board";
import { fetchProducts, fetchCarts } from "@/store/product";
import { fetchMembers } from "@/store/member";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "@/assets/css/reset.css";
import ScrollToTop from "./ScrolooTop.jsx";

store.dispatch(fetchNotice());
store.dispatch(fetchReview());
store.dispatch(fetchProducts());
store.dispatch(fetchCarts());
store.dispatch(fetchMembers());

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

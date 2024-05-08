import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "@/store/index.js";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "@/assets/css/reset.css";
import ScrollToTop from "./ScrolooTop.jsx";


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

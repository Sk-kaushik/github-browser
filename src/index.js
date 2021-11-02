import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { RootContextProvider } from "./context/RootContext";

import App from "./App";

import "antd/dist/antd.css";
import "./styles/style.scss";

ReactDOM.render(
  <BrowserRouter>
    <RootContextProvider>
      <App />
    </RootContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);

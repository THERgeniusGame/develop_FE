import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css';

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/config/storeConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="index">
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </div>
);

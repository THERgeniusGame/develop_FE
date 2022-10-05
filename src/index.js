import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import './index.css'

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/config/configStore"
import { Helmet } from 'react-helmet'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <div className="index">
    <Helmet>
      <title>Ther Genius Game</title>
    </Helmet>
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>

  </div>
);

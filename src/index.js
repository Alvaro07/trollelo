import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";

import App from "./components/App/App";
import "./utils/fontawesome";
import "./styles/index.scss";

const root = document.getElementById("root");

// Principal render
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={App} />
    </Router>
  </Provider>,
  root
);

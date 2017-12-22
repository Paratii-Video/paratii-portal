/* @flow */

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "scripts/createStore";
import AppContainer from "containers/AppContainer";
import "styles/app.scss";

const store = createStore();

let root: ?Element = document.getElementById("root");

if (!root) {
  root = document.createElement("div");
  root.setAttribute("id", "root");
  document.body && document.body.appendChild(root);
}

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  root
);

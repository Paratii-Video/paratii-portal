import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import createStore from "scripts/createStore";
import AppContainer from "containers/AppContainer";
import "styles/index.scss";

const store = createStore();

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("root")
);

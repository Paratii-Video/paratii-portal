import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AppContainer from "containers/AppContainer";

const Root = () => (
  <BrowserRouter>
    <Route path="/" component={AppContainer} />
  </BrowserRouter>
);

export default Root;

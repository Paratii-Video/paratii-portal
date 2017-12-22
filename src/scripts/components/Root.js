import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import AppContainer from "containers/AppContainer";
import UploadFile from "containers/UploadFileContainer";

const Root = () => (
  <BrowserRouter>
    <Route path="/" component={AppContainer}>
      <Route path="/uploader/upload-file" component={UploadFile} />
    </Route>
  </BrowserRouter>
);

export default Root;

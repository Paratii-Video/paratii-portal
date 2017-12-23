import React from "react";
import { shallow } from "enzyme";

export default (Component, defaultProps) => props => {
  const finalProps = {
    ...defaultProps,
    ...props
  };
  return shallow(<Component {...finalProps} />);
};

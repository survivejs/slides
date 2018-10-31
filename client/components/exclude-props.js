import React from "react";
import { omit } from "lodash";

export default function excludeProps(exclude, element) {
  const ExcludedStyled = props =>
    React.createElement(element, omit(props, exclude));

  return ExcludedStyled;
}

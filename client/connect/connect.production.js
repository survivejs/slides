import React from "react";
import initialData from "../../.initial-data.json";

function connect() {
  return component => {
    const Connect = props =>
      React.createElement(component, { ...props, ...initialData });

    return Connect;
  };
}

export default connect;

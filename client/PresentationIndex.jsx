import React from "react";
import Interactive from "antwar-interactive";
import PresentationIndexContainer from "./PresentationIndexContainer.jsx";
import "highlight.js/styles/github.css";
import "./global.css";

const PresentationIndex = () => (
  <Interactive
    id="client/PresentationIndexContainer.jsx"
    component={PresentationIndexContainer}
  />
);

export default PresentationIndex;

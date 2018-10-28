import React from "react";
import PropTypes from "prop-types";
import Interactive from "antwar-interactive";
import PresentationIndexContainer from "./PresentationIndexContainer.jsx";
import "highlight.js/styles/github.css";
import "./global.css";

const PresentationIndex = ({ theme, presentations }) => (
  <Interactive
    id="client/PresentationIndexContainer.jsx"
    component={PresentationIndexContainer}
    theme={theme}
    presentations={presentations}
  />
);
PresentationIndex.propTypes = {
  theme: PropTypes.object,
  presentations: PropTypes.array
};

export default PresentationIndex;

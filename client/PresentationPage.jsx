import React from "react";
import PropTypes from "prop-types";
import Interactive from "antwar-interactive";
import PresentationContainer from "./PresentationContainer.jsx";
import connect from "./utils/connect";
import "highlight.js/styles/github.css";
import "./global.css";

const apiUrl = "http://localhost:4000";

const PresentationPage = ({ theme }) => (
  <Interactive
    id="src/PresentationContainer.jsx"
    component={PresentationContainer}
    theme={theme}
    apiUrl={apiUrl}
  />
);
PresentationPage.propTypes = {
  theme: PropTypes.object
};

export default connect(
  `
{
  theme {
    primaryColor
    secondaryColor
  }
}
`,
  {
    apiUrl
  }
)(PresentationPage);

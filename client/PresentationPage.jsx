import React from "react";
import Interactive from "antwar-interactive";
import PresentationContainer from "./PresentationContainer.jsx";
import connect from "./utils/connect";
import "./global.css";

const apiUrl = "http://localhost:4000";

const PresentationPage = ({ theme }) => (
  <Interactive
    id="src/PresentationContainer.jsx"
    component={PresentationContainer}
    theme={theme}
  />
);

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

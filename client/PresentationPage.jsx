import React from "react";
import PropTypes from "prop-types";
import Interactive from "antwar-interactive";
import PresentationContainer from "./PresentationContainer.jsx";

const PresentationPage = ({ theme, slides }) => (
  <Interactive
    id="client/PresentationContainer.jsx"
    component={PresentationContainer}
    theme={theme}
    slides={slides}
  />
);
PresentationPage.propTypes = {
  theme: PropTypes.object,
  slides: PropTypes.array
};

export default PresentationPage;

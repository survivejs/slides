import React from "react";
import PropTypes from "prop-types";
import Presenter from "./components/Presenter.jsx";
import connect from "./connect";
import apiUrl from "./api-url";
import initialData from "../initial-data.graphql";

function PresentationContainer({ presentation = {} }) {
  return <Presenter theme={presentation.theme} slides={presentation.slides} />;
}
PresentationContainer.propTypes = {
  presentation: PropTypes.object
};

export default connect(
  initialData,
  { apiUrl }
)(PresentationContainer);

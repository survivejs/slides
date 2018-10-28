import React from "react";
import PropTypes from "prop-types";
import Presenter from "./components/Presenter.jsx";
import connect from "./connect";
import apiUrl from "./api-url";
import initialData from "../initial-data.graphql";

function PresentationContainer({ name, presentations = [] }) {
  return (
    <Presenter
      {...presentations.find(presentation => presentation.name === name)}
    />
  );
}
PresentationContainer.propTypes = {
  name: PropTypes.string,
  presentations: PropTypes.array
};

export default connect(
  initialData,
  { apiUrl }
)(PresentationContainer);

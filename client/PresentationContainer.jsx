import React from "react";
import PropTypes from "prop-types";
import Presenter from "./components/Presenter.jsx";
import connect from "./connect";
import apiUrl from "./api-url";
import initialData from "../initial-data.graphql";

function PresentationContainer({ presentations = [], presentationID }) {
  return (
    <Presenter
      {...presentations.find(
        presentation => presentation.id === presentationID
      )}
      presentationID={presentationID}
    />
  );
}
PresentationContainer.propTypes = {
  presentations: PropTypes.array,
  presentationID: PropTypes.string
};

export default connect(
  initialData,
  { apiUrl }
)(PresentationContainer);

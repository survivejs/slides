import React from "react";
import PropTypes from "prop-types";
import Presenter from "./components/Presenter.jsx";
import connect from "./connect";
import apiUrl from "./api-url";
import initialData from "../initial-data.graphql";

function PresentationIndexContainer({ presentations = [], theme = {} }) {
  return (
    <Presenter
      theme={theme}
      slides={[
        {
          layout: "TITLE",
          content: {
            title: "SurviveJS Slides",
            author: "Juho Vepsäläinen"
          }
        },
        {
          layout: "MARKDOWN",
          content: {
            title: "Presentations",
            markup: presentations
              .map(({ slides, id }) => `* [${slides[0].content.title}](${id})`)
              .join("\n")
          }
        }
      ]}
    />
  );
}
PresentationIndexContainer.propTypes = {
  presentations: PropTypes.arrayOf(PropTypes.object),
  theme: PropTypes.object
};

export default connect(
  initialData,
  { apiUrl }
)(PresentationIndexContainer);

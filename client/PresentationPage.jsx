import React from "react";
import PropTypes from "prop-types";
import Interactive from "antwar-interactive";
import Presenter from "./components/Presenter.jsx";
import connect from "./utils/connect";
import "highlight.js/styles/github.css";
import "./global.css";

const PresentationPage = ({ theme, slides }) => (
  <Interactive
    id="client/components/Presenter.jsx"
    component={Presenter}
    theme={theme}
    slides={slides}
  />
);
PresentationPage.propTypes = {
  theme: PropTypes.object,
  slides: PropTypes.array
};

export default connect(
  `
{
  theme {
    primaryColor
    secondaryColor
  }
  slides {
    layout
    content {
      ... on TitleContent {
      	title
        author
    	}
      ... on MarkdownContent {
      	title
        markup
    	}
    }
  }
}
`,
  {
    apiUrl: "http://localhost:4000"
  }
)(PresentationPage);

import React from "react";
import PropTypes from "prop-types";
import Swipe from "react-swipe-component";
import { request } from "graphql-request";
import root from "window-or-global";
import Slides from "./Slides.jsx";
import Options from "./Options.jsx";
import apiUrl from "../api-url";

class Presenter extends React.Component {
  state = {
    slide: getSlide(),
    showOptions: false,
    theme: null
  };
  componentDidCatch(err) {
    // TODO: Use a nice error overlay here
    console.error(err); // eslint-disable-line no-console
  }
  componentDidMount() {
    document.addEventListener("keydown", this.onKeydown, false);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown, false);
  }
  onKeydown = event => {
    const { key } = event;

    if (key === "ArrowUp") {
      event.preventDefault();
      this.moveToPreviousSlide();
    }
    if (key === "ArrowDown") {
      event.preventDefault();
      this.moveToNextSlide();
    }
    if (key === "s") {
      this.setState({ showOptions: !this.state.showOptions });
    }
  };

  moveToPreviousSlide = () => {
    this.goToSlide(Math.max(parseInt(root.location.hash.slice(1)) - 1, 0));
  };

  moveToNextSlide = () => {
    this.goToSlide(
      Math.min(
        parseInt(root.location.hash.slice(1)) + 1,
        this.props.slides.length - 1
      )
    );
  };

  goToSlide = slide => {
    this.setUrlHash(slide);
    this.setState({ slide });
    this.scrollToSlide(slide);
  };

  scrollToSlide(slide) {
    const element = root.document.getElementsByClassName(`slide-${slide}`)[0];

    element && element.scrollIntoView({ behavior: "smooth" });
  }

  setUrlHash(slide) {
    root.location = `${root.location.origin}${root.location.pathname}#${slide}`;
  }

  render() {
    const { slides } = this.props;
    const { showOptions } = this.state;
    const theme = this.state.theme || this.props.theme;

    return (
      <Swipe
        mouseSwipe
        onSwipedUp={this.moveToNextSlide}
        onSwipedDown={this.moveToPreviousSlide}
      >
        <Slides
          slides={slides}
          theme={theme}
          onSlideVisible={this.setUrlHash}
        />
        {showOptions &&
          process.env.NODE_ENV !== "production" && (
            <Options
              themeName={theme.name}
              onChangeTheme={this.onChangeTheme}
            />
          )}
      </Swipe>
    );
  }

  onChangeTheme = themeName => {
    const { name: presentationName } = this.props;

    request(
      apiUrl,
      `
mutation($presentationName: String!, $themeName: String!) {
  changeTheme(presentationName: $presentationName, themeName: $themeName) {
    theme {
      name
      primaryColor
      secondaryColor
      backgroundColor
    }
  }
}
      `,
      { presentationName, themeName }
    ).then(({ changeTheme: { theme } }) => {
      this.setState({ theme });
    });
  };
}
Presenter.propTypes = {
  name: PropTypes.string,
  slides: PropTypes.array,
  theme: PropTypes.object
};

function getSlide() {
  if (!root.location) {
    return 0;
  }

  return root.location.hash ? parseInt(root.location.hash.slice(1)) : 0;
}

export default Presenter;

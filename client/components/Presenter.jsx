import React from "react";
import PropTypes from "prop-types";
import { request } from "graphql-request";
import root from "window-or-global";
import { styled } from "linaria/react";
import Slides from "./Slides.jsx";
import Options from "./Options.jsx";
import apiUrl from "../api-url";

const PresenterContainer = styled.div``;

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
    if (root.document) {
      root.document.addEventListener("keydown", this.onKeydown, false);
      root.addEventListener("scroll", this.onScroll);
    }
  }
  componentWillUnmount() {
    if (root.document) {
      root.document.removeEventListener("keydown", this.onKeydown, false);
      root.removeEventListener("scroll", this.onScroll);
    }
  }
  onKeydown = event => {
    const { key } = event;

    if (key === "ArrowUp" || key === "ArrowLeft") {
      event.preventDefault();
      this.moveToPreviousSlide();
    }
    if (key === "ArrowDown" || key === "ArrowRight") {
      event.preventDefault();
      this.moveToNextSlide();
    }
    if (key === "s") {
      this.setState({ showOptions: !this.state.showOptions });
    }
  };

  onScroll = () => {
    const scrollY = root.scrollY;
    const slideHeight = getSlideHeight();
    const currentSlide = Math.floor(scrollY / slideHeight);

    root.location.hash = `#${currentSlide}`;
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

    // TODO: Control based on slide if it changes
    return (
      <PresenterContainer>
        <Slides slides={slides} theme={theme} />
        {showOptions &&
          process.env.NODE_ENV !== "production" && (
            <Options
              themeName={theme.name}
              onChangeTheme={this.onChangeTheme}
            />
          )}
      </PresenterContainer>
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
      background
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

// Assumes there's at least one slide
function getSlideHeight() {
  const element = root.document.getElementsByClassName(`slide-0`)[0];

  if (element) {
    return element.offsetHeight;
  }

  return 0;
}

export default Presenter;

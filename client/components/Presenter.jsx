import React from "react";
import PropTypes from "prop-types";
import { request } from "graphql-request";
import root from "window-or-global";
import { isEqual } from "lodash";
import { styled } from "linaria/react";
import scrollIntoView from "scroll-into-view";
import Slides from "./Slides.jsx";
import Options from "./Options.jsx";
import apiUrl from "../api-url";

const PresenterContainer = styled.div``;

class Presenter extends React.Component {
  state = {
    gitDiff: "",
    slide: getSlide(),
    showOptions: false,
    theme: null
  };
  scrollTimeout = null;

  componentDidCatch(err) {
    // TODO: Use a nice error overlay here
    console.error(err); // eslint-disable-line no-console
  }
  componentDidMount() {
    if (root.document) {
      const { slide } = this.state;
      const slideHeight = getSlideHeight();

      root.scrollTo(root.scrollX, slide * slideHeight);
      root.document.addEventListener("keydown", this.onKeydown, false);
      root.addEventListener("wheel", this.onScroll);

      if (!root.location.hash) {
        root.location.hash = 0;
      }
    }
  }
  componentWillUnmount() {
    if (root.document) {
      root.document.removeEventListener("keydown", this.onKeydown, false);
      root.removeEventListener("wheel", this.onScroll);
      root.clearTimeout(this.scrollTimeout);
    }
  }
  componentDidUpdate(nextProps) {
    if (!isEqual(this.props.slides, nextProps.slides)) {
      root.scrollTo(root.scrollX, getSlideHeight() * this.state.slide);
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
    const nearestSlide = Math.round(scrollY / slideHeight);

    root.location.hash = nearestSlide;

    root.clearTimeout(this.scrollTimeout);
    this.scrollTimeout = root.setTimeout(() => {
      if (scrollY === root.scrollY) {
        this.scrollToSlide(nearestSlide);
      }
    }, 100);
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
    this.setState({ slide });
    this.scrollToSlide(slide);
  };

  scrollToSlide(slide) {
    const element = root.document.getElementsByClassName(`slide-${slide}`)[0];

    element &&
      scrollIntoView(element, () => {
        root.location.hash = slide;
      });
  }

  render() {
    const { presentationID, slides } = this.props;
    const { gitDiff, showOptions } = this.state;
    // TODO: Likely we should resolve to theme per slide
    const theme = this.state.theme || (slides && slides[0].theme) || {};

    return (
      <PresenterContainer>
        <Slides slides={slides} theme={theme} presentationID={presentationID} />
        {showOptions &&
          process.env.NODE_ENV !== "production" && (
            <Options
              gitDiff={gitDiff}
              themeID={theme.id}
              onChangeTheme={this.onChangeTheme}
            />
          )}
      </PresenterContainer>
    );
  }

  onChangeTheme = themeID => {
    const { presentationID } = this.props;

    if (!presentationID) {
      return;
    }

    request(
      apiUrl,
      `
mutation($presentationID: ID!, $themeID: ID!) {
  changePresentationTheme(presentationID: $presentationID, themeID: $themeID) {
    gitDiff
    theme {
      id
      primaryColor
      secondaryColor
      background
    }
  }
}
      `,
      { presentationID, themeID }
    ).then(({ changePresentationTheme: { gitDiff, theme } }) => {
      this.setState({ gitDiff, theme });
    });
  };
}
Presenter.propTypes = {
  presentationID: PropTypes.string,
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

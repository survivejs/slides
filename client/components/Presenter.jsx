import React from "react";
import PropTypes from "prop-types";
import Swipe from "react-swipe-component";
import root from "window-or-global";
import Slides from "./Slides.jsx";

// TODO: Lazy load as in https://www.npmjs.com/package/react-intersection-observer#polyfill
if (root.location) {
  require("intersection-observer");
}
class Presenter extends React.Component {
  state = {
    slide: getSlide()
  };
  componentDidCatch(err) {
    // TODO: Use a nice error overlay here
    console.log(err);
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
    const { slides, theme } = this.props;

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
      </Swipe>
    );
  }
}
Presenter.propTypes = {
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

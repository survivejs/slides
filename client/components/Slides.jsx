import React from "react";
import PropTypes from "prop-types";
import Observer from "react-intersection-observer";
import TitlePage from "./TitlePage.jsx";

function Slides({ slides = [], theme, onSlideVisible }) {
  function onSlideChange(slide) {
    return inView => {
      if (inView) {
        onSlideVisible(slide);
      }
    };
  }

  return slides.map((slide, index) => (
    <Observer onChange={onSlideChange(index)} key={`slide-${index}`}>
      <TitlePage theme={theme} />
    </Observer>
  ));
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  onSlideVisible: PropTypes.func
};

export default Slides;

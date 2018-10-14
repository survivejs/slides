import React from "react";
import PropTypes from "prop-types";
import Observer from "react-intersection-observer";
import TitleContent from "./TitleContent.jsx";

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
      {slide.layout === "TITLE" && (
        <TitleContent theme={theme} content={slide.content} />
      )}
    </Observer>
  ));
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  onSlideVisible: PropTypes.func
};

export default Slides;

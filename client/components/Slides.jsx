import React from "react";
import PropTypes from "prop-types";
import Observer from "react-intersection-observer";
import layouts from "./layouts";

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
      {React.createElement(layouts[slide.layout], {
        theme,
        content: slide.content
      })}
    </Observer>
  ));
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  onSlideVisible: PropTypes.func
};

export default Slides;

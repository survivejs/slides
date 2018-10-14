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

  return slides.map((slide, index) => {
    const slideKey = `slide-${index}`;

    // Slides are given class names for keyboard navigation to work.
    return (
      <div className={slideKey} key={slideKey}>
        <Observer onChange={onSlideChange(index)}>
          {React.createElement(layouts[slide.layout], {
            theme,
            content: slide.content
          })}
        </Observer>
      </div>
    );
  });
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  onSlideVisible: PropTypes.func
};

export default Slides;

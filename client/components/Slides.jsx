import React from "react";
import PropTypes from "prop-types";
import Observer from "react-intersection-observer";
import { styled } from "linaria/react";
import layouts from "./layouts";

const Slide = styled.div`
  page-break-after: always; /* Needed for print to work */
`;

function Slides({ slides = [], theme, onSlideVisible }) {
  return slides.map((slide, index) => {
    const slideKey = `slide-${index}`;

    // Slides are given class names for keyboard navigation to work.
    return (
      <Slide className={slideKey} key={slideKey}>
        <Observer onChange={onSlideChange(index, onSlideVisible)}>
          {React.createElement(getLayout(slide.layout), {
            theme,
            content: slide.content
          })}
        </Observer>
      </Slide>
    );
  });
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  onSlideVisible: PropTypes.func
};

function onSlideChange(slide, onSlideVisible) {
  return inView => {
    if (inView) {
      onSlideVisible(slide);
    }
  };
}

function getLayout(name) {
  if (!layouts[name]) {
    throw new Error(`No layout found for ${name}`);
  }

  return layouts[name];
}

export default Slides;

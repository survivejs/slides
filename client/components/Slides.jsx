import React from "react";
import PropTypes from "prop-types";
import ScrollPercentage from "react-scroll-percentage";
import root from "window-or-global";
import { styled } from "linaria/react";
import layouts from "./layouts";

// TODO: Lazy load as in https://www.npmjs.com/package/react-intersection-observer#polyfill
if (root.location) {
  require("intersection-observer");
}

const Slide = styled.div`
  page-break-after: always; /* Needed for print to work */
`;

function Slides({ slides = [], theme, onSlideVisible }) {
  return slides.map((slide, index) => {
    const slideKey = `slide-${index}`;

    // Slides are given class names for keyboard navigation to work.
    return (
      <Slide className={slideKey} key={slideKey}>
        <ScrollPercentage onChange={onSlideChange(index, onSlideVisible)}>
          {React.createElement(getLayout(slide.layout), {
            theme,
            content: slide.content
          })}
        </ScrollPercentage>
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
  return (percentage, inView) => {
    if (Math.floor(percentage * 100) / 100 === 0.5 && inView === true) {
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

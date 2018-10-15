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

const SlideContainer = styled.div`
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  max-height: 100vh;
`;

const Slide = styled.div`
  page-break-after: always; /* Needed for print to work */
  background-color: ${props => props.backgroundColor};
  scroll-snap-align: start;
`;

function Slides({ slides = [], theme, onSlideVisible }) {
  return (
    <SlideContainer>
      {slides.map((slide, index) => {
        const slideKey = `slide-${index}`;

        // Slides are given class names for keyboard navigation to work.
        return (
          <Slide
            className={slideKey}
            backgroundColor={theme.backgroundColor}
            key={slideKey}
          >
            <ScrollPercentage onChange={onSlideChange(index, onSlideVisible)}>
              {React.createElement(getLayout(slide.layout), {
                theme,
                content: slide.content
              })}
            </ScrollPercentage>
          </Slide>
        );
      })}
    </SlideContainer>
  );
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  onSlideVisible: PropTypes.func
};

function onSlideChange(slide, onSlideVisible) {
  return (percentage, inView) => {
    // TODO: Figure out why this doesn't get triggered while scrolling with mouse
    if (inView === true && percentage > 0) {
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

import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import layouts from "./layouts";

const Slide = styled.div`
  background: ${props => props.background};
`;

function Slides({ slides = [], theme }) {
  return slides.map((slide, index) => {
    const slideKey = `slide-${index}`;

    // Slides are given class names for keyboard navigation to work.
    return (
      <Slide className={slideKey} key={slideKey}>
        {React.createElement(getLayout(slide.layout), {
          theme,
          content: slide.content
        })}
      </Slide>
    );
  });
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object
};

function getLayout(name) {
  if (!layouts[name]) {
    throw new Error(`No layout found for ${name}`);
  }

  return layouts[name];
}

export default Slides;

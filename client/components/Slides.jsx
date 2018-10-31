import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import layouts from "./layouts";
import excludeProps from "./exclude-props";

const SlideContainer = styled.div``;

const Slide = styled.div`
  background: ${props => props.background};
`;

const SlideNumber = styled(excludeProps("index", "div"))`
  position: absolute;
  top: ${({ index }) => (index + 1) * 100 - 5}vh;
  right: 3vw;
`;

function Slides({ slides = [], theme, presentationID }) {
  return (
    <SlideContainer>
      {slides.map((slide, index) => {
        const slideKey = `slide-${index}`;

        // Slides are given class names for keyboard navigation to work.
        return (
          <Slide className={slideKey} key={slideKey}>
            {React.createElement(getLayout(slide.layout), {
              theme,
              content: slide.content,
              presentationID
            })}
            {index && (
              <SlideNumber index={index}>
                {index}/{slides.length - 1}
              </SlideNumber>
            )}
          </Slide>
        );
      })}
    </SlideContainer>
  );
}
Slides.propTypes = {
  slides: PropTypes.array,
  theme: PropTypes.object,
  presentationID: PropTypes.string
};

function getLayout(id) {
  if (!layouts[id]) {
    throw new Error(`No layout found for ${id}`);
  }

  return layouts[id];
}

export default Slides;

import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
// import excludeProps from "../exclude-props";

// TODO: Exclude props
const ImageContainer = styled.div`
  display: grid;
  min-height: 100vh;
  max-height: 100vh;
  text-align: center;
  padding: 2em;
  box-sizing: border-box;
`;

const Image = styled.img`
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  align-self: center;
  justify-self: center;
`;

const ImageContent = ({ content = {} }) => (
  <ImageContainer>
    {content ? (
      <Image src={content.asset} title={content.source || ""} height="100%" />
    ) : null}
  </ImageContainer>
);

ImageContent.propTypes = {
  content: PropTypes.object
};

/*
      style={{
        minHeight: "100vh",
        maxHeight: "100vh",
        background: `url(${content.asset})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
      }}
*/

export default ImageContent;

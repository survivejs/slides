import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
// import excludeProps from "../exclude-props";

// TODO: Exclude props
const ImageContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  text-align: center;
`;

const Image = styled.img`
  height: 100%;
  object-fit: contain;
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

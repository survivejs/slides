import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";

const EmbedPageContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 0.5fr 1.5fr;
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${modularScale(7)};
  margin-left: 5vw;
  color: ${props => props.color};
`;

const Embed = styled.iframe`
  align-self: start;
  justify-self: center;
`;

const EmbedContent = ({ content = {}, theme = {} }) => (
  <EmbedPageContainer>
    <Title color={theme.primaryColor}>{content.title}</Title>
    <Embed width="90%" height="80%" src={content.link} frameBorder="0" />
  </EmbedPageContainer>
);
EmbedContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default EmbedContent;

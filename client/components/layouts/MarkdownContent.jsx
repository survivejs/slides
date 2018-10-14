import React from "react";
import PropTypes from "prop-types";
import { styled } from "@bebraw/linaria/react";
import { modularScale } from "polished";

const MarkdownContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
`;

const Title = styled.h1`
  font-size: ${modularScale(7)};
  margin-left: 5vw;
  color: ${props => props.color};
`;

const Markup = styled.h2`
  font-size: ${modularScale(4)};
  margin-right: 5vw;
  justify-self: end;
  color: ${props => props.color};
`;

const MarkdownContent = ({ content = {}, theme = {} }) => (
  <MarkdownContainer>
    <Title color={theme.primaryColor}>{content.title}</Title>
    <Markup color={theme.secondaryColor}>{content.markup}</Markup>
  </MarkdownContainer>
);
MarkdownContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default MarkdownContent;

import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import Markdown from "../Markdown.jsx";
import excludeProps from "../exclude-props";

const MarkdownContainer = styled(excludeProps(["background", "title"], "div"))`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: ${({ title }) => (title ? "0.25fr 1.75fr" : "1fr")};
  align-items: center;
  line-height: 1.5;
  background: ${({ background }) => background};
  background-size: cover;
`;

const Title = styled.h1`
  font-size: ${modularScale(6)};
  margin-left: 5vw;
  color: ${props => props.color};
`;

const Markup = styled(excludeProps(["color", "title"], "div"))`
  font-size: ${modularScale(4)};
  margin-left: 5vw;
  align-self: start;
  color: ${({ color }) => color};
`;

// TODO: Restore (linaria bug)
// align-self: ${({ title }) => (title ? "start" : "center")};

const MarkdownContent = ({ background = {}, content = {}, theme = {} }) => (
  <MarkdownContainer
    background={getBackground(background)}
    title={content.title}
  >
    {content.title && (
      <Title color={theme.primaryColor}>
        <Markdown>{content.title}</Markdown>
      </Title>
    )}
    <Markup
      className="markup"
      color={theme.secondaryColor}
      title={content.title}
    >
      <Markdown>{content.markup}</Markdown>
    </Markup>
  </MarkdownContainer>
);
MarkdownContent.propTypes = {
  background: PropTypes.object,
  content: PropTypes.object,
  theme: PropTypes.object
};

function getBackground(background) {
  if (!background || !background.asset) {
    return;
  }

  return background && `${linearGradient()},url(${background.asset})`;
}

// TODO: Make this more flexible
function linearGradient() {
  return `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7))`;
}

export default MarkdownContent;

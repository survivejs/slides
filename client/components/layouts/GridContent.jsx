import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import Markdown from "../Markdown.jsx";
import getBackground from "./get-background";
import excludeProps from "../exclude-props";

const GridContainer = styled(excludeProps(["background"], "div"))`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 0.25fr 1.75fr;
  align-items: center;
  line-height: 1.5;
  background: ${({ background }) => background};
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

const Title = styled.h1`
  font-size: ${modularScale(6)};
  margin-left: 5vw;
  margin-right: 5vw;
  color: ${props => props.color};
`;

const Markup = styled(excludeProps(["color"], "div"))`
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: ${modularScale(4)};
  margin-left: 5vw;
  margin-right: 5vw;
  align-self: start;
  color: ${props => props.color};
  opacity: 0.8;
`;

const MarkdownContainer = styled.div`
  margin: 0.5em;
`;

const GridContent = ({ background = {}, content = {}, theme = {} }) => (
  <GridContainer background={getBackground(background)}>
    <Title color={theme.primaryColor}>
      <Markdown>{content.title}</Markdown>
    </Title>
    <Markup className="markup" color={theme.secondaryColor}>
      <MarkdownContainer>
        <Markdown>{content.columns[0]}</Markdown>
      </MarkdownContainer>
      <MarkdownContainer>
        <Markdown>{content.columns[1]}</Markdown>
      </MarkdownContainer>
    </Markup>
  </GridContainer>
);
GridContent.propTypes = {
  background: PropTypes.object,
  content: PropTypes.object,
  theme: PropTypes.object
};

export default GridContent;

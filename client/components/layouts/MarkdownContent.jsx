import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import Markdown from "../Markdown.jsx";

const MarkdownContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: ${({ title }) => (title ? "0.25fr 1.75fr" : "1fr")};
  align-items: center;
  line-height: 1.5;
  background: ${props => props.background};
`;

const Title = styled.h1`
  font-size: ${modularScale(6)};
  margin-left: 5vw;
  color: ${props => props.color};
`;

const Markup = styled.div`
  font-size: ${modularScale(4)};
  margin-left: 5vw;
  color: ${props => props.color};
`;

const MarkdownContent = ({ content = {}, theme = {} }) => (
  <MarkdownContainer
    background={content.background && content.background.asset}
    title={content.title}
  >
    {content.title && (
      <Title color={theme.primaryColor}>
        <Markdown>{content.title}</Markdown>
      </Title>
    )}
    <Markup className="markup" color={theme.secondaryColor}>
      <Markdown>{content.markup}</Markdown>
    </Markup>
  </MarkdownContainer>
);
MarkdownContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default MarkdownContent;

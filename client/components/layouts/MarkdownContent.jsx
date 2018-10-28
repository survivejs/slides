import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock.jsx";

const MarkdownContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 0.25fr 1.75fr;
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
  align-self: start;
  color: ${props => props.color};
`;

const MarkdownContent = ({ content = {}, theme = {} }) => (
  <MarkdownContainer
    background={content.background && content.background.asset}
  >
    <Title color={theme.primaryColor}>
      <ReactMarkdown source={content.title} />
    </Title>
    <Markup color={theme.secondaryColor}>
      <ReactMarkdown source={content.markup} renderers={{ code: CodeBlock }} />
    </Markup>
  </MarkdownContainer>
);
MarkdownContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default MarkdownContent;

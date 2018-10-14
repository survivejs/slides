import React from "react";
import PropTypes from "prop-types";
import { styled } from "@bebraw/linaria/react";
import { modularScale } from "polished";

const TitlePageContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
`;

const Presentation = styled.h1`
  font-size: ${modularScale(7)};
  margin-left: 5vw;
  color: ${props => props.color};
`;

const Author = styled.h2`
  font-size: ${modularScale(4)};
  margin-right: 5vw;
  justify-self: end;
  color: ${props => props.color};
`;

const TitleContent = ({ content = {}, theme = {} }) => (
  <TitlePageContainer>
    <Presentation color={theme.primaryColor}>{content.title}</Presentation>
    <Author color={theme.secondaryColor}>{content.author}</Author>
  </TitlePageContainer>
);
TitleContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default TitleContent;

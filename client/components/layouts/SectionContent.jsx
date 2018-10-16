import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";

/* eslint-disable no-unused-vars */
const SectionPageContainer = styled(({ backgroundColor, ...rest }) => (
  <div {...rest} />
))`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  align-items: center;
  background: ${props => props.background};
`;

const Title = styled.h1`
  font-size: ${modularScale(7)};
  margin-left: 10vw;
  color: ${props => props.color};
`;

const SectionContent = ({ content = {}, theme = {} }) => (
  <SectionPageContainer background={theme.primaryColor}>
    <Title color={theme.background}>{content.title}</Title>
  </SectionPageContainer>
);
SectionContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default SectionContent;

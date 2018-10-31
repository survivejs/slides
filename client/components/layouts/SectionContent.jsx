import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import excludeProps from "../exclude-props";

const SectionPageContainer = styled(excludeProps("backgroundColor", "div"))`
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

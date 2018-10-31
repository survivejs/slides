import React from "react";
import PropTypes from "prop-types";
import { request } from "graphql-request";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import apiUrl from "../../api-url";

const TitlePageContainer = styled.div`
  min-height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  align-items: center;
`;

const Presentation = styled.h1`
  font-size: ${modularScale(7)};
  margin-left: 10vw;
  color: ${props => props.color};
`;

const Author = styled.h2`
  font-size: ${modularScale(4)};
  margin-right: 5vw;
  justify-self: end;
  color: ${props => props.color};
`;

class TitleContent extends React.Component {
  state = {
    title: ""
  };

  render() {
    const { content = {}, theme = {} } = this.props;
    const title = this.state.title || content.title;

    // TODO: contentEditable
    return (
      <TitlePageContainer>
        <Presentation color={theme.primaryColor} onBlur={this.onChangeTitle}>
          {title}
        </Presentation>
        <Author color={theme.secondaryColor}>{content.author}</Author>
      </TitlePageContainer>
    );
  }

  onChangeTitle = ({ target: { innerHTML: title } }) => {
    const { presentationID } = this.props;

    request(
      apiUrl,
      `
mutation($presentationID: ID!, $content: ContentInput!) {
  updateSlideContent(
    slideIndex: 0
    presentationID: $presentationID
    content: $content
  ) {
    content {
      title
    }
  }
}
    `,
      { presentationID, content: { title } }
    ).then(({ updateSlideContent: { content: { title } } }) => {
      this.setState({ title });
    });
  };
}

TitleContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object,
  presentationID: PropTypes.string
};

export default TitleContent;

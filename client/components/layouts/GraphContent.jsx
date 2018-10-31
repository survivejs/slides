import React from "react";
import PropTypes from "prop-types";
import { styled } from "linaria/react";
import { modularScale } from "polished";
import ReactMarkdown from "react-markdown";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true
});

const GraphContainer = styled.div`
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

const Graph = styled.div`
  font-size: ${modularScale(4)};
  margin-left: 5vw;
  align-self: start;
  color: ${props => props.color};
`;

class GraphContent extends React.Component {
  state = {
    graph: ""
  };

  componentDidMount() {
    const graph = this.props.content.graph;

    mermaid.render("graph", graph, graph => this.setState({ graph }));
  }

  render() {
    const { content = {}, theme = {} } = this.props;
    const { graph } = this.state;

    return (
      <GraphContainer
        background={content.background && content.background.asset}
      >
        <Title color={theme.primaryColor}>
          <ReactMarkdown source={content.title} />
        </Title>
        <Graph
          className="markup"
          color={theme.secondaryColor}
          dangerouslySetInnerHTML={{ __html: graph }}
        />
      </GraphContainer>
    );
  }
}

GraphContent.propTypes = {
  content: PropTypes.object,
  theme: PropTypes.object
};

export default GraphContent;

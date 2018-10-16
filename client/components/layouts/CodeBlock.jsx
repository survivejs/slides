// From react-markdown
import React from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js/lib/highlight";

// TODO: Figure out how to register only the needed languages.
// Ideally we wouldn't need to highlight in the frontend at all.
// Instead, the backend should be able to do it somehow.
// https://github.com/highlightjs/highlight.js/issues/1471
hljs.registerLanguage("graphql", e => ({
  aliases: ["gql"],
  k: {
    keyword:
      "query mutation subscription|10 type interface union scalar fragment|10 enum on ...",
    literal: "true false null"
  },
  c: [
    e.HCM,
    e.QSM,
    e.NM,
    { cN: "type", b: "[^\\w][A-Z][a-z]", e: "\\W", eE: !0 },
    { cN: "literal", b: "[^\\w][A-Z][A-Z]", e: "\\W", eE: !0 },
    { cN: "variable", b: "\\$", e: "\\W", eE: !0 },
    { cN: "keyword", b: "[.]{2}", e: "\\." },
    { cN: "meta", b: "@", e: "\\W", eE: !0 }
  ],
  i: /([;<']|BEGIN)/
}));

class CodeBlock extends React.PureComponent {
  constructor(props) {
    super(props);
    this.setRef = this.setRef.bind(this);
  }

  setRef(el) {
    this.codeEl = el;
  }

  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <pre>
        <code ref={this.setRef} className={`language-${this.props.language}`}>
          {this.props.value}
        </code>
      </pre>
    );
  }
}

CodeBlock.defaultProps = {
  language: ""
};

CodeBlock.propTypes = {
  value: PropTypes.string,
  language: PropTypes.string
};

export default CodeBlock;

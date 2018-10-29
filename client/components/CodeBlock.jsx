// From react-markdown
import React from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js/lib/highlight";
import diff from "highlight.js/lib/languages/diff";
import yaml from "highlight.js/lib/languages/yaml";

hljs.registerLanguage("diff", diff);
hljs.registerLanguage("yaml", yaml);

// TODO: Figure out how to register only the needed languages.
// Ideally we wouldn't need to highlight in the frontend at all.
// Instead, the backend should be able to do it somehow.
// https://github.com/highlightjs/highlight.js/issues/1471
// https://github.com/highlightjs/highlight.js/pull/1543
hljs.registerLanguage("graphql", () => ({
  aliases: ["gql"],
  keywords: {
    keyword:
      "query mutation subscription|10 type interface union scalar fragment|10 enum on ...",
    literal: "true false null"
  },
  contains: [
    hljs.HASH_COMMENT_MODE,
    hljs.QUOTE_STRING_MODE,
    hljs.NUMBER_MODE,
    {
      className: "type",
      begin: "[^\\w][A-Z][a-z]",
      end: "\\W",
      excludeEnd: true
    },
    {
      className: "literal",
      begin: "[^\\w][A-Z][A-Z]",
      end: "\\W",
      excludeEnd: true
    },
    {
      className: "variable",
      begin: "\\$",
      end: "\\W",
      excludeEnd: true
    },
    {
      className: "keyword",
      begin: "[.]{2}",
      end: "\\."
    },
    {
      className: "meta",
      begin: "@",
      end: "\\W",
      excludeEnd: true
    }
  ],
  illegal: /([;<']|BEGIN)/
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

import React from "react";
import PropTypes from "prop-types";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock.jsx";

function Markdown({ children }) {
  return <ReactMarkdown source={children} renderers={{ code: CodeBlock }} />;
}
Markdown.propTypes = {
  children: PropTypes.string
};

export default Markdown;

import React from "react";
import PropTypes from "prop-types";
import Sidebar from "react-sidebar";
import Select from "react-select";
import { styled } from "linaria/react";
import CodeBlock from "./CodeBlock.jsx";
import connect from "../connect";
import apiUrl from "../api-url";

const OptionsContainer = styled.div`
  margin: 0.5em;
`;

const Header = styled.h2`
  margin-bottom: 0.5em;
`;

function Options({ themeID, themes, gitDiff, onChangeTheme }) {
  const options = toOptions(themes);

  return (
    <Sidebar
      pullRight
      sidebar={
        <OptionsContainer>
          <Header>Theme</Header>
          <Select
            value={options.find(({ value }) => value === themeID)}
            options={options}
            onChange={({ value }) => onChangeTheme(value)}
          />
          <CodeBlock value={gitDiff} language="diff" />
        </OptionsContainer>
      }
      open
      styles={{
        sidebar: { background: "white", minWidth: "20%", position: "fixed" }
      }}
    />
  );
}
Options.propTypes = {
  themeID: PropTypes.string,
  themes: PropTypes.array,
  gitDiff: PropTypes.string,
  onChangeTheme: PropTypes.func
};

function toOptions(themes = []) {
  return themes.map(({ id }) => ({ value: id, label: id }));
}

export default connect(
  `
{
  themes {
    id
  }
  gitDiff
}
  `,
  { apiUrl }
)(Options);

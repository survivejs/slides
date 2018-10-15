import React from "react";
import PropTypes from "prop-types";
import Sidebar from "react-sidebar";
import Select from "react-select";
import { styled } from "linaria/react";
import connect from "../connect";
import apiUrl from "../api-url";

const OptionsContainer = styled.div`
  margin: 0.5em;
`;

const Header = styled.h2`
  margin-bottom: 0.5em;
`;

function Options({ themeName, themes, onChangeTheme }) {
  const options = toOptions(themes);

  return (
    <Sidebar
      pullRight
      sidebar={
        <OptionsContainer>
          <Header>Theme</Header>
          <Select
            value={options.find(({ value }) => value === themeName)}
            options={options}
            onChange={({ value }) => onChangeTheme(value)}
          />
        </OptionsContainer>
      }
      open
      styles={{
        sidebar: { background: "white", minWidth: "20%" }
      }}
    />
  );
}
Options.propTypes = {
  themeName: PropTypes.string,
  themes: PropTypes.array,
  onChangeTheme: PropTypes.func
};

function toOptions(themes = []) {
  return themes.map(({ name }) => ({ value: name, label: name }));
}

export default connect(
  `
{
  themes {
    name
  }
}
  `,
  { apiUrl }
)(Options);

import React from "react";
import Sidebar from "react-sidebar";
import { styled } from "linaria/react";

const OptionsContainer = styled.div`
  margin: 0.5em;
`;

function Options() {
  return (
    <Sidebar
      pullRight
      sidebar={
        <OptionsContainer>
          <h2>Theme</h2>
        </OptionsContainer>
      }
      open
      styles={{
        sidebar: { background: "white", minWidth: "20%" }
      }}
    />
  );
}

export default Options;

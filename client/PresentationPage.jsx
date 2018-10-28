import React from "react";
import Interactive from "antwar-interactive";
import PresentationContainer from "./PresentationContainer.jsx";

const PresentationPageWrapper = name => {
  const PresentationPage = () => (
    <Interactive
      id="client/PresentationContainer.jsx"
      component={PresentationContainer}
      name={name}
    />
  );

  return PresentationPage;
};

export default PresentationPageWrapper;

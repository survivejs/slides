import React from "react";
import Interactive from "antwar-interactive";
import PresentationContainer from "./PresentationContainer.jsx";

const PresentationPageWrapper = presentationID => {
  const PresentationPage = () => (
    <Interactive
      id="client/PresentationContainer.jsx"
      component={PresentationContainer}
      presentationID={presentationID}
    />
  );

  return PresentationPage;
};

export default PresentationPageWrapper;

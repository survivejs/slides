module.exports = () => ({
  output: "build",
  paths: {
    "/": () => require("./client/PresentationIndex.jsx").default,
    "intro-to-graphql": () => require("./client/PresentationPage.jsx").default
  }
});

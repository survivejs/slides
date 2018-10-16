module.exports = () => ({
  output: "build",
  paths: {
    // TODO: Generate a presentation index
    // "/": () => require("./client/PresentationPage.jsx").default
    "intro-to-graphql": () => require("./client/PresentationPage.jsx").default
  }
});

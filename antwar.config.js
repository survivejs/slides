module.exports = () => ({
  output: "build",
  paths: {
    "/": () => require("./src/PresentationPage.jsx").default
  }
});

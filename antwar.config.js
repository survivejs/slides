module.exports = () => ({
  output: "build",
  paths: {
    "/": () => require("./client/PresentationPage.jsx").default
  }
});

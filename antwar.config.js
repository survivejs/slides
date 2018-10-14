module.exports = () => ({
  output: "build",
  render: {
    page: require("./utils/render-page")
  },
  paths: {
    "/": () => require("./client/PresentationPage.jsx").default
  }
});

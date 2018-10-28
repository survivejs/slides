module.exports = () => ({
  output: "build",
  paths: {
    "/": () => require("./client/PresentationIndex.jsx").default,
    "intro-to-graphql": () =>
      require("./client/PresentationPage.jsx").default("intro-to-graphql"),
    "lets-make-a-graphql-presentation": () =>
      require("./client/PresentationPage.jsx").default(
        "lets-make-a-graphql-presentation"
      )
  }
});

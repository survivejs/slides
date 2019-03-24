module.exports = () => ({
  output: "build",
  paths: {
    "/": () => require("./client/PresentationIndex.jsx").default,
    "graphql-without-graphql": () =>
      require("./client/PresentationPage.jsx").default(
        "graphql-without-graphql"
      ),
    "intro-to-graphql": () =>
      require("./client/PresentationPage.jsx").default("intro-to-graphql"),
    "lets-make-a-graphql-presentation": () =>
      require("./client/PresentationPage.jsx").default(
        "lets-make-a-graphql-presentation"
      )
  }
});

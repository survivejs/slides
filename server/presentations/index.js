const path = require("path");
const { loadYAML } = require("../utils");

// TODO: Clean up
module.exports = {
  "intro-to-graphql": loadYAML(
    path.resolve(__dirname, "intro-to-graphql.yaml")
  ),
  "lets-make-a-graphql-presentation": loadYAML(
    path.resolve(__dirname, "lets-make-a-graphql-presentation.yaml")
  )
};

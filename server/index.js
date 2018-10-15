/* eslint-disable no-console */
const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const { importSchema } = require("graphql-import");
const themes = require("./themes");
const slides = require("./slides");

const resolvers = {
  Layout: {
    TITLE: "title",
    MARKDOWN: "markdown"
  },
  Query: {
    themes: () => Object.values(themes),
    theme: (root, { name }) => themes[name],
    slides: () => slides
  },
  Content: {
    __resolveType: resolveContentType
  },
  ContentType: {
    __resolveType: resolveContentType
  }
};

const server = new GraphQLServer({
  typeDefs: importSchema(path.resolve(__dirname, "schema.graphql")),
  resolvers
});
server.start(() => console.log("Server is running on localhost:4000"));

function resolveContentType({ author, markup }) {
  if (author) {
    return "TitleContent";
  }

  if (markup) {
    return "MarkdownContent";
  }
}

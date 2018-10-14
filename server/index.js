/* eslint-disable no-console */
const path = require("path");
const { GraphQLServer } = require("graphql-yoga");
const { importSchema } = require("graphql-import");

const theme = {
  primaryColor: "#09b5c4",
  secondaryColor: "#19a0ab94"
};

const slides = [
  {
    layout: "title",
    content: {
      title: "Brief Introduction to GraphQL",
      author: "Juho Vepsäläinen"
    }
  },
  {
    layout: "markdown",
    content: {
      title: "Testing Markdown",
      markup: `
* One
* Two
* Three
`
    }
  }
];

const resolvers = {
  Layout: {
    TITLE: "title",
    MARKDOWN: "markdown"
  },
  Query: {
    theme: () => theme,
    slides: () => slides
  },
  ContentType: {
    __resolveType(obj) {
      if (obj.author) {
        return "TitleContent";
      }

      if (obj.markup) {
        return "MarkdownContent";
      }
    }
  }
};

const server = new GraphQLServer({
  typeDefs: importSchema(path.resolve(__dirname, "schema.graphql")),
  resolvers
});
server.start(() => console.log("Server is running on localhost:4000"));

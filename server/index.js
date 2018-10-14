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
    layout: "TITLE",
    content: {
      title: "Brief Introduction to GraphQL",
      author: "Juho Vepsäläinen"
    }
  }
];

const resolvers = {
  Query: {
    theme: () => theme,
    slides: () => slides
  }
};

const server = new GraphQLServer({
  typeDefs: importSchema(path.resolve(__dirname, "schema.graphql")),
  resolvers
});
server.start(() => console.log("Server is running on localhost:4000"));

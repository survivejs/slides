/* eslint-disable no-console */
const { GraphQLServer } = require("graphql-yoga");

const typeDefs = `
type Query {
  theme: Theme
}

type Theme {
  primaryColor: String!
  secondaryColor: String!
}
`;

const resolvers = {
  Query: {
    theme: () => ({
      primaryColor: "#09b5c4",
      secondaryColor: "#19a0ab94"
    })
  }
};

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));

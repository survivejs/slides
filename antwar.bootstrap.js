/* eslint-disable no-console */
// Needed for JSX compilation to work
require("@babel/register");

// Needed by generators
require("@babel/polyfill/noConflict");

const antwar = require("antwar");

main(process.argv[2]);

function main(environment) {
  if (environment === "build") {
    const fs = require("fs");
    const { request } = require("graphql-request");

    request(
      "http://localhost:4000",
      fs.readFileSync("./initial-data.graphql", { encoding: "utf8" })
    ).then(data => {
      console.log("Writing initial data");
      fs.writeFileSync("./.initial-data.json", JSON.stringify(data, null, 2), {
        encoding: "utf8"
      });

      console.log("Running build");
      runAntwar(environment);
    });
  } else {
    runAntwar(environment).then(() => {
      console.log("Surf to http://localhost:3000");
    });
  }
}

function runAntwar(environment) {
  return antwar[environment]({
    environment,
    configurationPaths: {
      antwar: require.resolve("./antwar.config"),
      webpack: require.resolve("./webpack.config")
    }
  }).catch(err => {
    console.error(err);

    process.exit(1);
  });
}

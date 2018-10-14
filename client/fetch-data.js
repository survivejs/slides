/* eslint-disable no-console */
const fs = require("fs");
const { request } = require("graphql-request");

function fetchData() {
  request(
    "http://localhost:4000",
    fs.readFileSync("./initial-data.graphql", { encoding: "utf8" })
  ).then(data => console.log(JSON.stringify(data, null, 2)));
}

module.exports = fetchData;

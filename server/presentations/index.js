const fs = require("fs");
const path = require("path");
const { fromPairs } = require("lodash");
const { loadYAML } = require("../utils");

module.exports = loadPresentations();

function loadPresentations() {
  return fromPairs(
    fs
      .readdirSync(path.resolve(__dirname))
      .filter(p => path.extname(p) === ".yaml")
      .map(id => [id, loadPresentation(path.basename(id, path.extname(id)))])
  );
}

function loadPresentation(id) {
  return {
    ...loadYAML(path.resolve(__dirname, `${id}.yaml`)),
    id
  };
}

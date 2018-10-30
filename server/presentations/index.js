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
      .map(filename => {
        const id = path.basename(filename, path.extname(filename));

        return [id, loadPresentation(id)];
      })
  );
}

function loadPresentation(id) {
  return {
    ...loadYAML(path.resolve(__dirname, `${id}.yaml`)),
    id
  };
}

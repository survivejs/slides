const fs = require("fs");
const YAML = require("yaml");

function saveYAML(filename, data) {
  fs.writeFileSync(filename, YAML.stringify(data));
}

function loadYAML(filename) {
  return YAML.parseAllDocuments(fs.readFileSync(filename, "utf8")).map(a =>
    a.toJSON()
  )[0];
}

module.exports = {
  saveYAML,
  loadYAML
};

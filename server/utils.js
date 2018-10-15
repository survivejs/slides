const fs = require("fs");
const YAML = require("yaml");

function loadYAML(filename) {
  const file = fs.readFileSync(filename, "utf8");
  const ret = YAML.parseAllDocuments(file).map(a => a.toJSON());

  return {
    ...ret[0],
    slides: ret.slice(1)
  };
}

exports.loadYAML = loadYAML;

const fs = require("fs");
const YAML = require("yaml");

function saveYAML(filename, data) {
  fs.writeFileSync(filename, YAML.stringify(data));
}

// TODO: This contains too specific info about the data (slides).
// Better separate
function loadYAML(filename) {
  const file = fs.readFileSync(filename, "utf8");
  const ret = YAML.parseAllDocuments(file).map(a => a.toJSON())[0];

  return {
    ...ret[0],
    slides: ret.slice(1)
  };
}

module.exports = {
  saveYAML,
  loadYAML
};

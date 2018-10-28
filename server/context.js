const themes = require("./themes");
const presentations = require("./presentations");

function getTheme(id) {
  return themes[id];
}
function getThemes() {
  return Object.values(themes);
}

// TODO: Update at FS to persist
function changeTheme({ presentationID, themeID }) {
  return {
    ...getField("presentation", presentations, presentationID),
    theme: getField("theme", themes, themeID)
  };
}
function getField(type, record, id) {
  const result = record[id];

  if (!result) {
    throw new Error(`No ${type} found using ${id}`);
  }

  return result;
}

function getPresentation(id) {
  return resolveTheme(presentations[id]);
}
function getPresentations() {
  return Object.values(presentations).map(resolveTheme);
}

const resolveTheme = resolveField("theme", themes);

function resolveField(field, lookup) {
  return entity => ({
    ...entity,
    [field]: lookup[entity[field]]
  });
}

module.exports = {
  changeTheme,
  getTheme,
  getThemes,
  getPresentation,
  getPresentations
};

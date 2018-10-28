const themes = require("./themes");
const presentations = require("./presentations");

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

module.exports = { changeTheme };

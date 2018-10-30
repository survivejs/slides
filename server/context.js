const path = require("path");
const simpleGit = require("simple-git/promise")(path.join(__dirname, ".."));
const themes = require("./themes");
const presentations = require("./presentations");
const { saveYAML } = require("./utils");

function getTheme(id) {
  return themes[id];
}
function getThemes() {
  return Object.values(themes);
}

function changeTheme({ presentationID, themeID }) {
  const presentation = getField("presentation", presentations, presentationID);
  const theme = getField("theme", themes, themeID);

  saveYAML(path.resolve(__dirname, "presentations", `${presentationID}.yaml`), [
    { title: presentation.title, theme: themeID },
    ...presentation.slides
  ]);

  return { theme, gitDiff: gitDiff() };
}
function getField(type, record, id) {
  const result = record[id];

  if (!result) {
    throw new Error(`No ${type} found using ${id}`);
  }

  return result;
}

function getPresentations() {
  return Object.keys(presentations).map(getPresentation);
}
function getPresentation(id) {
  const presentation = presentations[id];

  return {
    ...resolveTheme(presentation),
    slides: resolveToC(presentation.slides)
  };
}
function resolveToC(slides) {
  const sections = slides
    .filter(({ layout }) => layout === "section")
    .map(({ content: { title } }) => title);

  return slides.map(slide => {
    if (slide.layout === "toc") {
      return {
        layout: "markdown",
        content: {
          ...slide.content,
          markup: toMarkdownList(sections)
        }
      };
    }

    return slide;
  });
}
function toMarkdownList(items) {
  return items.map(item => `* ${item}`).join("\n");
}

const resolveTheme = resolveField("theme", themes);

function resolveField(field, lookup) {
  return entity => ({
    ...entity,
    [field]: lookup[entity[field]]
  });
}

function gitDiff() {
  return simpleGit.diff().then(result =>
    result
      .split("\n")
      .filter(line => !line.startsWith("diff "))
      .join("\n")
  );
}

module.exports = {
  gitDiff,
  changeTheme,
  getTheme,
  getThemes,
  getPresentation,
  getPresentations
};

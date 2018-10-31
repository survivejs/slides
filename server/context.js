const path = require("path");
const { merge } = require("lodash");
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

function updateSlideContent({ slideIndex, presentationID, content }) {
  const presentation = getField("presentation", presentations, presentationID);
  const oldSlides = presentation.slides;
  const oldSlide = oldSlides[slideIndex];
  const newSlide = merge({}, oldSlide, { content });
  const newSlides = oldSlides
    .slice(0, slideIndex)
    .concat(newSlide)
    .concat(oldSlides.slice(slideIndex + 1));

  updatePresentationFile(presentationID, newSlides);

  // TODO: What to return?
  return { content: newSlide.content, gitDiff: gitDiff() };
}
function changePresentationTheme({ presentationID, themeID }) {
  const presentation = getField("presentation", presentations, presentationID);
  const theme = getField("theme", themes, themeID);
  const oldSlides = presentation.slides;
  const newSlides = [{ ...oldSlides[0], theme: themeID }].concat(
    oldSlides.slice(1)
  );

  updatePresentationFile(presentationID, newSlides);

  return { theme, gitDiff: gitDiff() };
}
function getField(type, record, id) {
  const result = record[id];

  if (!result) {
    throw new Error(`No ${type} found using ${id}`);
  }

  return result;
}

function updatePresentationFile(presentationID, slides) {
  saveYAML(
    path.resolve(__dirname, "presentations", `${presentationID}.yaml`),
    slides
  );
}

function getPresentations() {
  return Object.keys(presentations).map(getPresentation);
}
function getPresentation(id) {
  const presentation = presentations[id];

  return {
    ...presentation,
    // TODO: Assumes only the first slide contains theme reference
    slides: resolveToC(presentation.slides)
      .map(slide => ({
        ...slide,
        theme: presentation.slides[0].theme
      }))
      .map(resolveTheme)
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
  updateSlideContent,
  changePresentationTheme,
  getTheme,
  getThemes,
  getPresentation,
  getPresentations
};

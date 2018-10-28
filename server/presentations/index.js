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
  const presentation = loadYAML(path.resolve(__dirname, `${id}.yaml`));

  return {
    ...presentation,
    slides: loadToC(presentation.slides),
    id
  };
}

function loadToC(slides) {
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

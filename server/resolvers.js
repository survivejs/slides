const themes = require("./themes");
const presentations = require("./presentations");

const resolvers = {
  Layout: {
    TITLE: "title",
    SECTION: "section",
    EMBED: "embed",
    MARKDOWN: "markdown"
  },
  Query: {
    themes: () => Object.values(themes),
    theme: (root, { name }) => themes[name],
    presentations: () => presentations,
    presentation: (root, { name }) => presentations[name]
  },
  Content: {
    __resolveType: resolveContentType
  },
  ContentType: {
    __resolveType: resolveContentType
  }
};

function resolveContentType({ author, link, markup, title }) {
  if (author) {
    return "TitleContent";
  }

  if (link) {
    return "EmbedContent";
  }

  if (markup) {
    return "MarkdownContent";
  }

  if (title) {
    return "SectionContent";
  }
}

module.exports = resolvers;

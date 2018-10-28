const themes = require("./themes");
const presentations = require("./presentations");

const resolvers = {
  Layout: {
    TITLE: "title",
    SECTION: "section",
    EMBED: "embed",
    MARKDOWN: "markdown",
    GRID: "grid"
  },
  Mutation: {
    changeTheme: (_, { presentationID, themeID }, { changeTheme }) =>
      changeTheme({ presentationID, themeID })
  },
  Query: {
    themes: () => Object.values(themes),
    theme: (_, { id }) => themes[id],
    presentations: () => Object.values(presentations).map(resolveTheme),
    presentation: (_, { id }) => resolveTheme(presentations[id])
  },
  Content: {
    __resolveType: resolveContentType
  },
  ContentType: {
    __resolveType: resolveContentType
  }
};

function resolveContentType({ author, link, markup, title, columns }) {
  if (author) {
    return "TitleContent";
  }

  if (link) {
    return "EmbedContent";
  }

  if (markup) {
    return "MarkdownContent";
  }

  if (columns) {
    return "GridContent";
  }

  if (title) {
    return "SectionContent";
  }
}

const resolveTheme = resolveField("theme", themes);

function resolveField(field, lookup) {
  return entity => ({
    ...entity,
    [field]: lookup[entity[field]]
  });
}

module.exports = resolvers;

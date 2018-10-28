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
    // TODO: Update at FS to persist
    changeTheme: (_, { presentationID, themeID }) => ({
      ...getField("presentation", presentations, presentationID),
      theme: getField("theme", themes, themeID)
    })
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

function getField(type, record, id) {
  const result = record[id];

  if (!result) {
    throw new Error(`No ${type} found using ${id}`);
  }

  return result;
}

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

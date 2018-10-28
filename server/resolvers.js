const themes = require("./themes");
const presentations = require("./presentations");

const resolvers = {
  Layout: {
    TITLE: "title",
    SECTION: "section",
    EMBED: "embed",
    MARKDOWN: "markdown"
  },
  Mutation: {
    // TODO: Update at FS to persist
    changeTheme: (_, { presentationName, themeName }) => ({
      ...getField("presentation", presentations, presentationName),
      theme: getField("theme", themes, themeName)
    })
  },
  Query: {
    themes: () => Object.values(themes),
    theme: (_, { name }) => themes[name],
    presentations: () => Object.values(presentations).map(resolveTheme),
    presentation: (_, { name }) => resolveTheme(presentations[name])
  },
  Content: {
    __resolveType: resolveContentType
  },
  ContentType: {
    __resolveType: resolveContentType
  }
};

function getField(type, record, name) {
  const result = record[name];

  if (!result) {
    throw new Error(`No ${type} found using ${name}`);
  }

  return result;
}

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

const resolveTheme = resolveField("theme", themes);

function resolveField(field, lookup) {
  return entity => ({
    ...entity,
    [field]: lookup[entity[field]]
  });
}

module.exports = resolvers;

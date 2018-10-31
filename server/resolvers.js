const resolvers = {
  Layout: {
    TITLE: "title",
    SECTION: "section",
    EMBED: "embed",
    MARKDOWN: "markdown",
    GRID: "grid",
    GRAPH: "graph"
  },
  Mutation: {
    changePresentationTheme: (
      _,
      { presentationID, themeID },
      { changePresentationTheme }
    ) => changePresentationTheme({ presentationID, themeID })
  },
  Query: {
    themes: (_, __, { getThemes }) => getThemes(),
    theme: (_, { id }, { getTheme }) => getTheme(id),
    presentations: (_, __, { getPresentations }) => getPresentations(),
    presentation: (_, { id }, { getPresentation }) => getPresentation(id),
    gitDiff: (_, __, { gitDiff }) => gitDiff()
  },
  Content: {
    __resolveType: resolveContentType
  },
  ContentType: {
    __resolveType: resolveContentType
  }
};

function resolveContentType({ author, link, markup, title, columns, graph }) {
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

  if (graph) {
    return "GraphContent";
  }

  if (title) {
    return "SectionContent";
  }
}

module.exports = resolvers;

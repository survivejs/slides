// TODO: Generate most of this from the schema
const resolvers = {
  Layout: {
    TITLE: "title",
    SECTION: "section",
    EMBED: "embed",
    MARKDOWN: "markdown",
    GRID: "grid"
  },
  Mutation: {
    changePresentationTheme: (
      _,
      { presentationID, themeID },
      { changePresentationTheme }
    ) => changePresentationTheme({ presentationID, themeID }),
    updateSlideContent: (
      _,
      { slideIndex, presentationID, content },
      { updateSlideContent }
    ) =>
      updateSlideContent({
        slideIndex,
        presentationID,
        content
      })
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

module.exports = resolvers;

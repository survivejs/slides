module.exports = `
type Query {
  themes: [Theme]!
  theme(name: String!): Theme
  presentations: [Presentation]!
  presentation(name: String!): Presentation
}

type Mutation {
  changeTheme(presentationName: String!, themeName: String!): Presentation
}

type Presentation {
  name: String!
  theme: Theme!
  slides: [Slide]!
}

type Theme {
  name: String!
  primaryColor: String!
  secondaryColor: String!
  background: String!
}

type Slide {
  layout: Layout!
  content: ContentType!
}

enum Layout {
  TITLE
  SECTION
  EMBED
  MARKDOWN
}

union ContentType =
    TitleContent
  | SectionContent
  | EmbedContent
  | MarkdownContent

interface Content {
  title: String
  background: ContentBackground
}

type ContentBackground {
  asset: String!
  source: String
}

type TitleContent implements Content {
  title: String
  background: ContentBackground
  author: String
}

type SectionContent implements Content {
  title: String
  background: ContentBackground
}

type EmbedContent implements Content {
  title: String
  background: ContentBackground
  link: String!
}

type MarkdownContent implements Content {
  title: String
  background: ContentBackground
  markup: String!
}
`;
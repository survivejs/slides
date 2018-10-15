# Introduction to GraphQL

1. `npm install`
2. `npm run watch server` (or `npm run server`) in one terminal
3. `npm start` in another

## Examples

### Example Query

```graphql
{
  theme(name: "survivejs") {
    primaryColor
    secondaryColor
    backgroundColor
  }
  presentation(name: "intro-to-graphql") {
    theme {
      primaryColor
      secondaryColor
      backgroundColor
    }
    slides {
      layout
      content {
        ... on TitleContent {
          title
          author
        }
        ... on SectionContent {
          title
        }
        ... on EmbedContent {
          title
          link
        }
        ... on MarkdownContent {
          title
          markup
        }
      }
    }
  }
}
```

### Theme API

```graphql
{
  themes {
    primaryColor
  }
  theme(name: "survivejs") {
    primaryColor
    secondaryColor
    backgroundColor
  }
}
```

### Presentation API

```graphql
{
  presentations {
    name
  }
  presentation(name: "intro-to-graphql") {
    theme {
      primaryColor
      secondaryColor
      backgroundColor
    }
    slides {
      layout
      content {
        ... on TitleContent {
          title
          author
        }
        ... on SectionContent {
          title
        }
        ... on EmbedContent {
          title
          link
        }
        ... on MarkdownContent {
          title
          markup
        }
      }
    }
  }
}
```

### Variables

**Query:**

```graphql
{
  theme(name: @themeName) {
    primaryColor
    secondaryColor
    backgroundColor
  }
}
```

**Variables:**

```json
{
  "themeName": "survivejs"
}
```

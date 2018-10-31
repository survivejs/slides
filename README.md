# SurviveJS Slides

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
    background
  }
  presentation(name: "intro-to-graphql") {
    theme {
      primaryColor
      secondaryColor
      background
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

### Example Mutation

```graphql
mutation {
  changePresentationTheme(
    presentationName: "intro-to-graphql"
    themeName: "survivejs"
  ) {
    name
    theme {
      name
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
    background
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
      background
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
    background
  }
}
```

**Variables:**

```json
{
  "themeName": "survivejs"
}
```

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
  slides {
    layout
    content {
      ... on Content {
        title
      }
      ... on TitleContent {
        title
        author
      }
      ... on MarkdownContent {
        title
        markup
      }
    }
  }
}
```

### Theme API

```graphql
{
  theme(name: "survivejs") {
    primaryColor
    secondaryColor
    backgroundColor
  }
  themes {
    primaryColor
  }
}
```

### Slide API

```graphql
{
  slides {
    layout
    content {
      ... on Content {
        title
      }
      ... on TitleContent {
        title
        author
      }
      ... on MarkdownContent {
        title
        markup
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

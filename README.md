# Introduction to GraphQL

1. `npm install`
2. `npm run watch server` (or `npm run server`) in one terminal
3. `npm start` in another

## Examples

**Example query:**

```graphql
{
  theme {
    primaryColor
    secondaryColor
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

const theme = require("../themes/graphql-finland");
const slides = [
  {
    layout: "title",
    content: {
      title: "Brief Introduction to GraphQL",
      author: "Juho Vepsäläinen"
    }
  },
  {
    layout: "markdown",
    content: {
      title: "Topics",
      markup: `
* What is GraphQL?
* Performing Queries
* Implementing a Server
* Subscriptions*
`
    }
  },
  {
    layout: "section",
    content: {
      title: "What is GraphQL?"
    }
  },
  {
    layout: "embed",
    content: {
      title: "GraphQL",
      link: "https://graphql.org/"
    }
  },
  {
    layout: "section",
    content: {
      title: "Performing Queries"
    }
  },
  {
    layout: "section",
    content: {
      title: "Implementing a Server"
    }
  },
  {
    layout: "section",
    content: {
      title: "Subscriptions*"
    }
  },
  {
    layout: "markdown",
    content: {
      title: "Code slide",
      markup: `
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');
React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`
`
    }
  },
  {
    layout: "markdown",
    content: {
      title: "Table slide",
      markup: `
| Feature | Support |
| ------ | ----------- |
| tables | ✔ |
| alignment | ✔ |
| wewt | ✔ |
`
    }
  },
  {
    layout: "markdown",
    content: {
      title: "Quote slide",
      markup: `
> Hasta la vista, baby! - Arnold Schwarzenegger
`
    }
  }
];

module.exports = {
  name: "intro-to-graphql",
  theme,
  slides
};

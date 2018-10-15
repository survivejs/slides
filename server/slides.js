module.exports = [
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
* What is GraphQL
* Performing Queries
* Implementing a Server
* Subscriptions*
`
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

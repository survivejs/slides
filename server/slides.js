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
      title: "Testing Markdown",
      markup: `
* One
* Two
* Three
`
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
  }
];

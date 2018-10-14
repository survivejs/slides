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
\`\`\`javascript
function helloWorld() {
  return 'hello world!';
}
\`\`\`
`
    }
  }
];

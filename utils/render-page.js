/* eslint-disable no-console */
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { getDataFromTree } = require("react-apollo");
const { Route, StaticRouter } = require("react-router");

module.exports = function renderPage({ location, content: component }, cb) {
  const page = React.createElement(
    StaticRouter,
    { location },
    React.createElement(Route, { component })
  );

  getDataFromTree(page)
    .then(() =>
      cb(null, {
        html: ReactDOMServer.renderToStaticMarkup(page)
      })
    )
    .catch(err => {
      console.error("Failed to render", page, err);

      cb(err);
    });
};

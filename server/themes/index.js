const { fromPairs, toPairs } = require("lodash");

module.exports = fromPairs(
  toPairs(require("require-dir")()).map(pair => [
    pair[0],
    { id: pair[0], ...pair[1] }
  ])
);

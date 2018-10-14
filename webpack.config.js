const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");

module.exports = env => {
  switch (env) {
    case "build":
    case "interactive":
      return commonConfig(env);
    default:
      return merge(commonConfig(env), developmentConfig());
  }
};

function commonConfig(env) {
  return {
    stats: "minimal",
    module: {
      rules: [
        {
          test: /\.js(x)$/,
          use: [
            "babel-loader",
            {
              loader: "@bebraw/linaria/loader",
              options: {
                sourceMap: env === "develop"
              }
            }
          ],
          include: path.join(__dirname, "client")
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: {
                sourceMap: env === "develop"
              }
            }
          ]
        },
        {
          test: /\.woff(2)?|\.ttf$|\.eot$/,
          use: [
            {
              loader: "url-loader",
              options: {
                limit: 5000
              }
            }
          ]
        },
        {
          test: /\.(gif|jpg|png|svg)$/,
          use: "file-loader"
        },
        {
          test: /\.(md|txt)$/,
          use: "raw-loader"
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin()]
  };
}

function developmentConfig() {
  return {
    stats: "minimal"
  };
}

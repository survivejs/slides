const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const merge = require("webpack-merge");

module.exports = env => {
  switch (env) {
    case "build":
    case "interactive":
      return merge(commonConfig(), buildConfig());
    default:
      return merge(commonConfig(), developmentConfig());
  }
};

function commonConfig() {
  return {
    stats: "minimal",
    module: {
      rules: [
        {
          test: /\.js(x)$/,
          use: "babel-loader",
          include: path.join(__dirname, "src")
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
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "assets"),
        config: path.resolve(__dirname, "antwar.config.js"), // XXX: styleguidist
        components: path.resolve(__dirname, "components"),
        utils: path.resolve(__dirname, "utils")
      }
    }
  };
}

function developmentConfig() {
  return {
    stats: "minimal",
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: { importLoaders: 1, modules: true }
            },
            "sass-loader"
          ]
        }
      ]
    }
  };
}

function buildConfig() {
  return {
    module: {
      rules: [
        {
          test: /\.s?css$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: "css-loader",
              options: { importLoaders: 1, modules: true }
            },
            "sass-loader"
          ]
        }
      ]
    },
    plugins: [new MiniCssExtractPlugin()]
  };
}

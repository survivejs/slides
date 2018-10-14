const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = env => ({
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
});

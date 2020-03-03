const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
let webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      hash: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        include: path.join(__dirname, "public/assets/"),
        use: [{ loader: "url-loader" }, { loader: "file-loader" }]
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: "file-loader"
      },
      {
        test: /\.(htm|html)$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        include: /src/,
        exclude: /node_modules/ // 排除掉node_modules，优化打包速度
      }
    ]
  }
};

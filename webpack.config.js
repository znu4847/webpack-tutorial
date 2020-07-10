const path = require("path");
// minify bundle.js file plugin
const TerserPlugin = require("terser-webpack-plugin");
// minify .css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// cleaning before building
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    // [contenthash] <- for caching
    filename: "bundle.[contenthash].js",
    // output.path
    path: path.resolve(__dirname, "./dist"),
    // relational file path
    publicPath: "",
  },
  mode: "none",
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env"],
            plugins: ["transform-class-properties"],
          },
        },
      },
    ],
  },
  plugins: [
    // minify bundle.js file size
    new TerserPlugin(),
    new MiniCssExtractPlugin({
      // [contenthash] <- for caching
      filename: "styles.[contenthash].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "**/*", // default
        path.join(process.cwd(), "build/**/*"), // additional cleaning folder
      ],
    }),
    new HtmlWebpackPlugin(),
  ],
};

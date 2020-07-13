const path = require("path");
// minify bundle.js file plugin
// included default when production mode
// const TerserPlugin = require("terser-webpack-plugin");
// minify .css file
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// cleaning before building
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// generating html
const HtmlWebpackPlugin = require("html-webpack-plugin");

// plugins list : webpack.js.org/plugins/

https: module.exports = {
  entry: "./src/index.js",
  output: {
    // [contenthash] <- for caching
    filename: "bundle.[contenthash].js",
    // output.path
    path: path.resolve(__dirname, "./dist"),
    // relational file path
    publicPath: "",
  },
  // mode : [none, development, production]
  // ref : https://webpack.js.org/configuration/mode/
  mode: "production",
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
      {
        // need 2 npm intallation. 1. loader, 2. plugin
        // npm install handlebars-loader --save-dev
        // npm install handlebars --save-dev
        test: /\.hbs$/,
        use: ["handlebars-loader"],
      },
    ],
  },
  plugins: [
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
    // html generating plugin
    new HtmlWebpackPlugin({
      // custumization options : https://github.com/jantimon/html-webpack-plugin
      title: "Hello World", // handlebar.option
      template: "src/index.hbs", // handlebar
      description: "some description", // handlebar.option
    }),
  ],
};

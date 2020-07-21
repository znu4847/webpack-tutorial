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

module.exports = {
  entry: {
    "hello-world": "./src/hello-world.js",
    druid: "./src/druid.js",
  },
  output: {
    // [contenthash] <- for caching, [name] multiple bundle file
    filename: "[name].[contenthash].js",
    // output.path
    path: path.resolve(__dirname, "./dist"),
    // relational file path
    publicPath: "",
  },
  // mode : [none, development, production]
  // ref : https://webpack.js.org/configuration/mode/
  mode: "production",
  optimization: {
    // to sharing common library, so can minify bundle.js file size
    splitChunks: {
      chunks: "all",
      minSize: 50000,
      automaticNameDelimiter: "_",
    },
  },
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
      filename: "[name].[contenthash].css",
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
      filename: "hello-world.html",
      chunks: ["hello-world", "vendors_druid_hello-world"],
      title: "Hello World", // handlebar.option
      template: "src/page-template.hbs", // handlebar
      description: "some description", // handlebar.option
    }),
    new HtmlWebpackPlugin({
      // custumization options : https://github.com/jantimon/html-webpack-plugin
      filename: "druid.html",
      chunks: ["druid", "vendors_druid_hello-world"],
      title: "Hello World", // handlebar.option
      template: "src/page-template.hbs", // handlebar
      description: "some description", // handlebar.option
    }),
  ],
};

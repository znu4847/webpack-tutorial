const path = require("path");
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
    // [name] : spllitted bundle-file-name
    filename: "[name].bundle.js",
    // output.path
    path: path.resolve(__dirname, "dist"),
    // relational file path
    publicPath: "",
  },
  // mode : [none, development, production]
  // ref : https://webpack.js.org/configuration/mode/
  mode: "development",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    index: "hello-world..html",
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/,
        use: ["file-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
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
      chunks: ["hello-world"],
      title: "Hello World", // handlebar.option
      template: "src/page-template.hbs", // handlebar
      description: "some description", // handlebar.option
    }),
    new HtmlWebpackPlugin({
      // custumization options : https://github.com/jantimon/html-webpack-plugin
      filename: "druid.html",
      chunks: ["druid"],
      title: "Hello World", // handlebar.option
      template: "src/page-template.hbs", // handlebar
      description: "some description", // handlebar.option
    }),
  ],
};

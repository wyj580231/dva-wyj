const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("./dist"),
    library: "dva-wyj", 
    libraryTarget: "umd" 
  },
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".scss", ".css"],
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "source-map-loader",
        enforce: "pre"
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: path.resolve(process.cwd(), "./src"),
        use: [
          {
            loader: "babel-loader"
          }
        ]
      }
    ]
  }
};

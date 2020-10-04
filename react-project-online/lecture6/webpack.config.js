module.exports = {
  entry: "./src/index.js",

  output: {
    path: __dirname + "/public/",
    filename: "bundle.js",
  },

  module: {
    loaders: [
      {
        test: /\.jsx$/,
        loaders: [
          "babel?" +
            JSON.stringify({
              cacheDirectory: true,
              presets: ["es2015", "react"],
            }),
        ],
        exclude: /node_modules/,
      },
    ],
  },
};

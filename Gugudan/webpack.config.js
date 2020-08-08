const path = require("path");
const webpack = require("webpack");
module.exports = {
  mode: "development",
  devtool: "eval", // hidden-source-map
  resolve: {
    extensions: [".js", ".jsx"],
  },
  entry: {
    app: "./client",
  },
  module: {
    rules: [
      {
        test: /.\jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                // 내부 preset에 대해서도 설정을 주고 싶으면 배열로 만들고
                targets: {
                  // 이거 browserslist에서 확인할 수 있다.
                  browsers: ["> 5% in KR ", "last 2 chrome versions"], // 지원하고자 하는 브라우저만 지원할 수 있도록 해주는 것이 좋다
                },
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [],
        },
      },
    ],
  },
  // babel의 플러그인 말고 전체적인 플러그인을 적용할 수 있다. 아래는 예시인데, 모든 로더 옵션에 debug를 true로
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    filename: "app.js",
    path: path.join(__dirname, "dist"),
  },
};

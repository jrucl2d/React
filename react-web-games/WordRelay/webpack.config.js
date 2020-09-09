const path = require("path");
const webpack = require("webpack");

module.exports = {
  name: "wordRelay-setting", // 어떤 것에 대한 설정인지
  mode: "development", // 실서비스에서는 production으로,
  devtool: "eval", // 빠르게 하겠다는 뜻
  resolve: {
    // 확장자를 따로 쓰지 않아도 되도록
    extensions: [".js", ".jsx"],
  },

  // 아래 두 개가 가장 중요하다
  entry: {
    // 입력
    app: ["./client"], // "./WordRelay.jsx"를 써줄 필요가 없는게 client.jsx에서 불러오는 것을 알고 있다.
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              {
                targets: {
                  browsers: ["> 5% in KR"],
                },
              },
            ],
            "@babel/preset-react",
          ],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-hot-loader/babel", // hot loader을 쓰기 위해서
          ],
        },
      },
    ],
  },
  plugins: [new webpack.LoaderOptionsPlugin({ debug: true })],
  output: {
    // 출력
    path: path.join(__dirname, "dist"),
    filename: "app.js",
    publicPath: "/dist/", // webpack dev server을 쓰기 위해서 node의 /dist express.static와 비슷
  },
};
// npx webpack으로 실행

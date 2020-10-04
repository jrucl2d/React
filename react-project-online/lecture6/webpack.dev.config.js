const webpack = require("webpack");

module.exports = {
  // webpack-dev-server를 콘솔이 아닌 자바스크립트로 실행하려면 HotReloadingModule를 사용하기 위해서
  // dev-server 클라이언트와 핫 모듈을 따로 entry에 넣어줘야 함
  entry: [
    "./src/index.jsx",
    "webpack-dev-server/client?http://0.0.0.0:8000", // 개발서버의 포트가 이 부분에 입력되어야 제대로 작동합니다
    "webpack/hot/only-dev-server",
  ],
  output: {
    path: "/", // public 이 아니고 /, 이렇게 하면 파일을 메모리에 저장하고 사용합니다
    filename: "bundle.js",
  },

  // 개발서버 설정입니다
  devServer: {
    hot: true,
    filename: "bundle.js",
    publicPath: "/",
    historyApiFallback: true,
    contentBase: "./public",
    /* 모든 요청을 프록시로 돌려서 express의 응답을 받아오며,
    bundle 파일의 경우엔 우선권을 가져서 devserver 의 스크립트를 사용하게 됩니다 */
    proxy: {
      "**": "http://localhost:8000", // express 서버주소
    },
    stats: {
      // 콘솔 로그를 최소화 합니다
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false,
    },
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],

  module: {
    loaders: [
      {
        test: /.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "react"],
          plugins: ["react-hot-loader/babel"],
        },
      },
    ],
  },
};
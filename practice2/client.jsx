const React = require("react");
const ReactDom = require("react-dom");
const { hot } = require("react-hot-loader/root"); // hot loader 사용

const WordRelay = require("./WordRelay");
const Hot = hot(WordRelay); // 이렇게 바꿔줌

ReactDom.render(<Hot />, document.querySelector("#root"));

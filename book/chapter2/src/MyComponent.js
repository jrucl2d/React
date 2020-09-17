import React, { Component } from "react";
import PropTypes from "prop-types";

// const MyComponent = (props) => {
//   const { name, children } = props;
//   return (
//     <div>
//       안녕하세요. 제 이름은 {name}입니다. <br /> children값은 {children}이게
//       나타나요
//     </div>
//   );
// };

// 바로 파라미터에서 구조분해 할당 가능
// const MyComponent = ({ name, favoriteNumber, children }) => {
//   return (
//     <div>
//       안녕하세요. 제 이름은 {name}입니다. <br /> children값은 {children}이게
//       나타나요
//       <br />
//       제가 제일 좋아하는 숫자는 {favoriteNumber}입니다.
//     </div>
//   );
// };

class MyComponent extends Component {
  // 이 안에 static method로 넣어줘도 됨
  static defaultProps = {
    name: "기본 이름",
  };
  static propTypes = {
    name: PropTypes.string,
    favoriteNumber: PropTypes.number.isRequired,
  };
  render() {
    const { name, favoriteNumber, children } = this.props;
    return (
      <div>
        안녕하세요 제 이름은 {name}입니다. <br />
        children 값은 {children}입니다. <br />
        제가 좋아하는 숫자는 {favoriteNumber}입니다.
      </div>
    );
  }
}

// MyComponent.defaultProps = {
//   name: "기본 이름",
// };
// MyComponent.propTypes = {
//   name: PropTypes.string, // 무조건 string으로 보내줘야 함
//   favoriteNumber: PropTypes.number.isRequired, // 필수로 propTypes를 지정해야 함
// };

export default MyComponent;

"use strict";

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You Liked Comment Number " + this.props.commentID;
    }
    return React.createElement(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

document.querySelectorAll(".like_btn_container").forEach((domContainer) => {
  const commentID = parseInt(domContainer.dataset.commentid, 10);
  ReactDOM.render(React.createElement(LikeButton, { commentID }), domContainer);
});

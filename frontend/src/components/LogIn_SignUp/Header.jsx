import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <button
          onClick={() => this.props.onHeaderLogInPress()}
          className="btn btn-outline-primary m-2"
        >
          Log In
        </button>
        <button
          onClick={() => this.props.onHeaderSignUpPress()}
          className="btn btn-outline-primary m-2"
        >
          Sign Up
        </button>
      </div>
    );
  }

  formatbutton() {
    if (this.props.option.opttxt === "<open string>")
      return (
        <input
          type="text"
          onChange={(val) =>
            this.props.onPress(val.target.value, this.props.option.nextqID)
          }
        />
      );
    if (this.props.selected === 0)
      return (
        <button
          onClick={() =>
            this.props.onPress(
              this.props.option.optID,
              this.props.option.nextqID
            )
          }
          className="btn btn-outline-primary m-2"
        >
          {this.props.option.opttxt}
        </button>
      );
    else
      return (
        <button
          onClick={() =>
            this.props.onPress(
              this.props.option.optID,
              this.props.option.nextqID
            )
          }
          className="btn btn-primary m-2"
        >
          {this.props.option.opttxt}
        </button>
      );
  }
}

export default Header;
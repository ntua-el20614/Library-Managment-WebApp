import React, { Component } from "react";
import Header from "./Header";

class LogIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      type: "0",
      schlid: "",
      message: "",
      unmessage: "",
    };
  }

  onUsernameChange = (val) => {
    if (val.target.value.length !== 0 && this.state.password.length !== 0)
      fetch(
        `http://localhost:9103/libraries/web/validate/${val.target.value}/${this.state.password}`
      )
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          this.setState({
            ...this.state,
            unmessage: obj.message,
            username: val.target.value,
          });
        });
    else this.setState({ ...this.state, username: val.target.value });
  };

  onPasswordChange = (val) => {
    if (val.target.value.length !== 0 && this.state.username.length !== 0)
      fetch(
        `http://localhost:9103/libraries/web/validate/${this.state.username}/${val.target.value}`
      )
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          this.setState({
            ...this.state,
            unmessage: obj.message,
            password: val.target.value,
          });
        });
    else this.setState({ ...this.state, password: val.target.value });
  };

  onLogIn = () => {
    if (this.state.username.length === 0) {
      this.setState({
        ...this.state,
        message: "Username is blank",
      });
    } else if (this.state.password.length === 0) {
      this.setState({
        ...this.state,
        message: "Password is blank",
      });
    } else if (this.state.unmessage !== "Validated") {
      this.setState({
        ...this.state,
        message: this.state.unmessage,
      });
    } else if (this.state.unmessage === "Validated") {
      this.props.LoggedIn(this.state.username);
    }
  };

  render() {
    console.log("Now at LogIn");
    return (
      <div>
        <Header
          onHeaderLogInPress={() => this.props.headerLogInPress()}
          onHeaderSignUpPress={() => this.props.headerSignUpPress()}
        />
        <table>
          <tr>
            <th>Username:</th>
            <td>
              <input type="text" onChange={this.onUsernameChange} />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input type="text" onChange={this.onPasswordChange} />
            </td>
          </tr>
        </table>
        <button onClick={this.onLogIn}>{"->"}</button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default LogIn;
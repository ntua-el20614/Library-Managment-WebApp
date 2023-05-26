import React, { Component } from "react";
import Menu from "./Menu";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dob: "",
      schlID: this.props.schlID,
      username: this.props.username,
      userID: this.props.userID,
      password: "",
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/userinfo/${this.state.username}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          fullname: obj.fullname,
          password: obj.password,
          dob: obj.dob,
        });
      });
  }

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
    console.log("Now at Profile");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
        />
        <table>
          <tr>
            <th>Full Name:</th>
            <td>{this.state.fullname}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>{this.state.dob.substring(0, 10)}</td>
          </tr>
          <tr>
            <th>Username:</th>
            <td>
              <td>{this.state.username}</td>
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <td>{this.state.password}</td>
            </td>
          </tr>
        </table>
        <button onClick={() => this.props.EditProfile()}>Edit Profile</button>
        {this.backuprestore()}
        <button onClick={() => this.props.LoggedOut()}>Log Out</button>
      </div>
    );
  }

  backuprestore() {
    if (this.state.type === "4") {
      //topoperator
      return (
        <div>
          <button>Back Up</button>
          <button>Restore</button>
        </div>
      );
    }
  }
}

export default Profile;
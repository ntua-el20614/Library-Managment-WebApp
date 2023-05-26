import React, { Component } from "react";

class Operator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullname: "",
      dob: "",
      schlname: "",
      username: this.props.username,
      userID: this.props.userID,
      password: "",
      type: this.props.type,
      approved: 0,
      message: "",
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
          dob: obj.dob.substring(0, 10),
          approved: obj.approved,
        });
      });
    fetch(`http://localhost:9103/libraries/web/opschool/${this.state.userID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schlname: obj.schoolName,
        });
      });
  }

  ApproveOperator = () => {
    fetch(
      `http://localhost:9103/libraries/web/approveuser/${this.state.username}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        approved: 1,
        message: "Operator Approved",
      });
    });
  };
  UnapproveOperator = () => {
    fetch(
      `http://localhost:9103/libraries/web/unapproveuser/${this.state.username}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        approved: 0,
        message: "Operator Unapproved",
      });
    });
  };
  DeleteOperator = () => {
    fetch(
      `http://localhost:9103/libraries/web/deleteuser/${this.state.username}`,
      {
        method: "POST",
        mode: "cors",
      }
    ).then(() => {
      this.setState({
        ...this.state,
        approved: 2,
        message: "Operator Deleted",
      });
    });
  };

  render() {
    console.log("Now at Operator");
    return (
      <div>
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
            <th>School Unit:</th>
            <td>
              <td>{this.state.schlname}</td>
            </td>
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
        {this.approveornot()}
        <button onClick={this.DeleteOperator}>Delete Operator</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotooperators()}>{"<-"}</button>
      </div>
    );
  }
  approveornot() {
    if (this.state.approved === 0) {
      return <button onClick={this.ApproveOperator}>Approve Operator</button>;
    } else if (this.state.approved === 1) {
      return (
        <button onClick={this.UnapproveOperator}>Unapprove Operator</button>
      );
    }
    return;
  }
}

export default Operator;
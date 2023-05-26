import React, { Component } from "react";

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: "",
      fullname: "",
      year: "",
      month: "",
      day: "",
      type: this.props.type,
      message: "",
      uniquemessage: "",
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
          year: obj.dob.substring(0, 4),
          month: obj.dob.substring(5, 7),
          day: obj.dob.substring(8, 10),
        });
      });
    console.log(this.state);
  }

  check() {
    if (this.state.fullname.length === 0) {
      this.setState({
        ...this.state,
        message: `Full Name is blank!`,
      });
      return 0;
    } else if (
      this.state.year.length !== 4 ||
      this.state.month.length !== 2 ||
      this.state.day.length !== 2
    ) {
      this.setState({ ...this.state, message: "Date of birth is wrong!" });
      return 0;
    } else if (this.state.password.length === 0) {
      this.setState({
        ...this.state,
        message: `Password is blank!`,
      });
      return 0;
    }
    this.setState({ ...this.state, message: "Updated!" });
    return 1;
  }

  onUpdateProfile = () => {
    let okay = this.check();
    if (okay === 1) {
      let dob = this.state.year + "-" + this.state.month + "-" + this.state.day;
      fetch(
        `http://localhost:9103/libraries/web/changeuser/${this.state.username}/${this.state.password}/${this.state.fullname}/${dob}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at EditProfile");
    return (
      <div>
        <table>
          <tr>
            <th>Full Name:</th>
            <td>{this.allowfullname()}</td>
          </tr>
          <tr>
            <th>Date of Birth:</th>

            <td>{this.allowdob()}</td>
          </tr>
          <tr>
            <th>Username:</th>
            <td>{this.state.username}</td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.password}
                onChange={(val) =>
                  this.setState({ ...this.state, password: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onUpdateProfile}>Update</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoprofile(this.state.username)}>
          {"<-"}
        </button>
      </div>
    );
  }
  allowfullname() {
    if (this.state.type === "3") return this.state.fullname; //student
    else
      return (
        <input
          type="text"
          placeholder={this.state.fullname}
          onChange={(val) =>
            this.setState({ ...this.state, fullname: val.target.value })
          }
        />
      );
  }
  allowdob() {
    if (this.state.type === "3")
      return this.state.dob.substring(0, 10); //student
    else
      return (
        <div>
          <input
            type="text"
            size="4"
            placeholder={this.state.year}
            onChange={(val) =>
              this.setState({ ...this.state, year: val.target.value })
            }
          />
          -
          <input
            type="text"
            size="2"
            placeholder={this.state.month}
            onChange={(val) =>
              this.setState({ ...this.state, month: val.target.value })
            }
          />
          -
          <input
            type="text"
            size="2"
            placeholder={this.state.day}
            onChange={(val) =>
              this.setState({ ...this.state, day: val.target.value })
            }
          />
        </div>
      );
  }
}

export default EditProfile;
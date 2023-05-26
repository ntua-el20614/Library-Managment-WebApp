import React, { Component } from "react";
import Header from "./Header";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [], //all schools
      username: "",
      password: "",
      fullname: "",
      year: "",
      month: "",
      day: "",
      type: "0",
      schlid: "",
      message: "",
      uniquemessage: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allschools`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schools: obj.map((school) => {
            //option.selected = 0;
            return school;
          }),
        });
      });
  }

  check() {
    if (this.state.username.length !== 0)
      fetch(`http://localhost:9103/libraries/web/check/${this.state.username}`)
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          this.setState({
            ...this.state,
            uniquemessage: obj.message,
          });
        });

    console.log(this.state);
    if (this.state.type === "0") {
      this.setState({
        ...this.state,
        message: `Please select type of user!`,
      });
      return 0;
    } else if (this.state.schlid.length === 0) {
      this.setState({
        ...this.state,
        message: `Please select school!`,
      });
      return 0;
    } else if (this.state.fullname.length === 0) {
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
    } else if (this.state.username.length === 0) {
      this.setState({
        ...this.state,
        message: `Username is blank!`,
      });
      return 0;
    } else if (this.state.uniquemessage.length === 24) {
      this.setState({
        ...this.state,
        message: `Username is already in use!`,
      });
      return 0;
    } else if (this.state.password.length === 0) {
      this.setState({
        ...this.state,
        message: `Password is blank!`,
      });
      return 0;
    }
    this.setState({ ...this.state, message: "Application Sent!" });
    return 1;
  }

  onSignUp = () => {
    let okay = this.check();
    if (okay === 1) {
      let dob = this.state.year + "-" + this.state.month + "-" + this.state.day;

      //Promise.all(
      fetch(
        `http://localhost:9103/libraries/web/adduserapp/${this.state.username}/${this.state.password}/${this.state.fullname}/${dob}`,
        {
          method: "POST",
          mode: "cors",
        }
      ).then(() => {
        if (this.state.type === "1")
          fetch(
            `http://localhost:9103/libraries/web/addoperator/${this.state.username}/${this.state.schlid}`,
            {
              method: "POST",
              mode: "cors",
            }
          );
        else if (this.state.type === "2")
          fetch(
            `http://localhost:9103/libraries/web/addprofessor/${this.state.username}/${this.state.schlid}`,
            {
              method: "POST",
              mode: "cors",
            }
          );
        else if (this.state.type === "3")
          fetch(
            `http://localhost:9103/libraries/web/addstudent/${this.state.username}/${this.state.schlid}`,
            {
              method: "POST",
              mode: "cors",
            }
          );
      });
    }
  };

  onUsernameChange = (val) => {
    if (val.target.value.length !== 0)
      fetch(`http://localhost:9103/libraries/web/check/${val.target.value}`)
        .then((response) => response.json())
        .then((obj) => {
          console.log(obj);
          this.setState({
            ...this.state,
            uniquemessage: obj.message,
            username: val.target.value,
          });
        });
    else this.setState({ ...this.state, username: val.target.value });
  };

  selectType = (val) => {
    this.setState({
      ...this.state,
      type: val.target.value, //1 for operator, 2 for professor, 3 for student
    });
  };

  selectSchool = (val) => {
    this.setState({
      ...this.state,
      schlid: val.target.value,
    });
  };

  render() {
    console.log("Now at SignUp");
    return (
      <div>
        <Header
          onHeaderLogInPress={() => this.props.headerLogInPress()}
          onHeaderSignUpPress={() => this.props.headerSignUpPress()}
        />
        <table>
          <tr>
            <th>Sign up as:</th>
            <td>
              <form>
                <dl onChange={this.selectType}>
                  <dd>
                    <input type="radio" name="choice" value="1" />
                    <label>Operator</label>
                  </dd>
                  <dd>
                    <input type="radio" name="choice" value="2" />
                    <label>Professor</label>
                  </dd>
                  <dd>
                    <input type="radio" name="choice" value="3" />
                    <label>Student</label>
                  </dd>
                </dl>
              </form>
            </td>
          </tr>
          <tr>
            <th>School Unit:</th>
            <td>
              <form>
                <select
                  multiple
                  name="School Unit"
                  onChange={this.selectSchool}
                >
                  {this.state.schools.map((school) => (
                    <option value={school.schoolID}>{school.schoolname}</option>
                  ))}
                </select>
              </form>
            </td>
          </tr>
          <tr>
            <th>Full Name:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, fullname: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Date of Birth:</th>
            <td>
              <input
                type="text"
                size="4"
                placeholder="YYYY"
                onChange={(val) =>
                  this.setState({ ...this.state, year: val.target.value })
                }
              />
              -
              <input
                type="text"
                size="2"
                placeholder="MM"
                onChange={(val) =>
                  this.setState({ ...this.state, month: val.target.value })
                }
              />
              -
              <input
                type="text"
                size="2"
                placeholder="DD"
                onChange={(val) =>
                  this.setState({ ...this.state, day: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Username:</th>
            <td>
              <input type="text" onChange={this.onUsernameChange} />
            </td>
          </tr>
          <tr>
            <th>Password:</th>
            <td>
              <input
                type="text"
                onChange={(val) =>
                  this.setState({ ...this.state, password: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onSignUp}>{"->"}</button>
        <div>{this.state.message}</div>
      </div>
    );
  }
}

export default SignUp;
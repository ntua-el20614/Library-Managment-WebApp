import React, { Component } from "react";

class EditSchool extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schlID: this.props.schlID,
      name: "",
      address: "",
      city: "",
      telephone: "",
      email: "",
      principal: "",
      message: "",
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/schlinfo/${this.state.schlID}`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          name: obj.schoolName,
          address: obj.address,
          city: obj.city,
          telephone: obj.telephone,
          email: obj.email,
          principal: obj.principal,
        });
      });
    console.log(this.state.type);
  }

  check() {
    if (this.state.name.length === 0) {
      this.setState({
        ...this.state,
        message: `Name of School is blank!`,
      });
      return 0;
    } else if (this.state.address.length === 0) {
      this.setState({
        ...this.state,
        message: `Address is blank!`,
      });
      return 0;
    } else if (this.state.city.length === 0) {
      this.setState({
        ...this.state,
        message: `City is blank!`,
      });
      return 0;
    } else if (this.state.telephone.length === 0) {
      this.setState({
        ...this.state,
        message: `Telephone is blank!`,
      });
      return 0;
    } else if (this.state.email.length === 0) {
      this.setState({
        ...this.state,
        message: `Email is blank!`,
      });
      return 0;
    } else if (this.state.principal.length === 0) {
      this.setState({
        ...this.state,
        message: `Principal name is blank!`,
      });
      return 0;
    }
    this.setState({ ...this.state, message: "School Updated!" });
    return 1;
  }

  onUpdateSchool = () => {
    let okay = this.check();
    console.log(this.state);
    if (okay === 1) {
      fetch(
        `http://localhost:9103/libraries/web/changeschool/${this.state.schlID}/${this.state.name}/${this.state.address}/${this.state.city}/${this.state.telephone}/${this.state.email}/${this.state.principal}`,
        {
          method: "POST",
          mode: "cors",
        }
      );
    }
  };

  render() {
    console.log("Now at EditSchool");
    return (
      <div>
        <table>
          <tr>
            <th>Name of School:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.name}
                onChange={(val) =>
                  this.setState({ ...this.state, name: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.address}
                onChange={(val) =>
                  this.setState({ ...this.state, address: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>City:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.city}
                onChange={(val) =>
                  this.setState({ ...this.state, city: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Telephone:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.telephone}
                onChange={(val) =>
                  this.setState({ ...this.state, telephone: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.email}
                onChange={(val) =>
                  this.setState({ ...this.state, email: val.target.value })
                }
              />
            </td>
          </tr>
          <tr>
            <th>Principal:</th>
            <td>
              <input
                type="text"
                placeholder={this.state.principal}
                onChange={(val) =>
                  this.setState({ ...this.state, principal: val.target.value })
                }
              />
            </td>
          </tr>
        </table>
        <button onClick={this.onUpdateSchool}>Update</button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoschool(this.state.schlID)}>
          {"<-"}
        </button>
      </div>
    );
  }
}

export default EditSchool;
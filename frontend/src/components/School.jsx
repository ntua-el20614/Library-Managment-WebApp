import React, { Component } from "react";

class School extends Component {
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

  onEditSchool = () => {};

  render() {
    console.log("Now at School");
    return (
      <div>
        <table>
          <tr>
            <th>Name of School:</th>
            <td>{this.state.name}</td>
          </tr>
          <tr>
            <th>Address:</th>
            <td>{this.state.address}</td>
          </tr>
          <tr>
            <th>City:</th>
            <td>{this.state.city}</td>
          </tr>
          <tr>
            <th>Telephone:</th>
            <td>{this.state.telephone}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{this.state.email}</td>
          </tr>
          <tr>
            <th>Principal:</th>
            <td>{this.state.principal}</td>
          </tr>
        </table>
        <button onClick={() => this.props.editschool(this.state.schlID)}>
          Edit School
        </button>
        <div>{this.state.message}</div>
        <button onClick={() => this.props.gotoschools()}>{"<-"}</button>
      </div>
    );
  }
}

export default School;
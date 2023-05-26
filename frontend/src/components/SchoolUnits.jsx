import React, { Component } from "react";
import Menu from "./Menu";

class SchoolUnits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      schools: [],
      type: this.props.type,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:9103/libraries/web/allschools`)
      .then((response) => response.json())
      .then((obj) => {
        this.setState({
          ...this.state,
          schools: obj.map((school) => {
            return school;
          }),
        });
      });
    console.log(this.state.type);
  }

  render() {
    console.log("Now at SchoolUnits");
    return (
      <div>
        <Menu
          type={this.state.type}
          profile={() => this.props.gotoprofile()}
          schools={() => this.props.gotoschools()}
          operators={() => this.props.gotooperators()}
        />
        <button onClick={() => this.props.addschool()}>Add School Unit</button>
        <div>All School Units:</div>
        <ul>
          {this.state.schools.map((school) => (
            <li key={school.schoolID}>
              {school.schoolname}
              <button onClick={() => this.props.gotoschool(school.schoolID)}>
                {"->"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default SchoolUnits;
import React, { Component } from "react";

import UserContext from "../UserContext";
import { loadBed } from "../backend";

class Bed extends Component {
  state = {
    user: {
      first_name: "",
      last_name: "",
      birth_date: ""
    }
  };

  componentDidMount() {
    if (this.isMyBed()) {
      const user = this.context.user;
      this.setUser({
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          birth_date: user.birth_date
        }
      });
    } else {
      this.unsubscribeFromBed = loadBed({
        userId: this.props.userId,
        setBed: this.setUser
      });
    }
  }

  componentWillUnmount() {
    if (!this.isMyBed()) {
      this.unsubscribeFromBed();
    }
  }

  setUser = user => {
    this.setState({ user });
  };

  isMyBed = () => {
    return this.props.userId === this.context.user.uid;
  };

  getUserName = () => {
    return `${this.state.user.first_name} ${this.state.user.last_name}`;
  };

  getUserAge = () => {
    return 10;
  };

  render() {
    return (
      <tr>
        <td>{this.getUserName()}</td>
        <td>{this.getUserAge()}</td>
      </tr>
    );
  }
}

Bed.contextType = UserContext;

export default Bed;

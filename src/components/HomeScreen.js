import React, { Component } from "react";

import UserContext from "../UserContext";

class HomeScreen extends Component {
  componentDidMount() {
    console.log("mount", this.context);
  }

  componentDidUpdate() {
    console.log("update", this.context);
  }

  render() {
    return <div>HomeScreen. rooms screen</div>;
  }
}

HomeScreen.contextType = UserContext;

export default HomeScreen;

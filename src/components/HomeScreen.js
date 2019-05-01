import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserContext from "../UserContext";

class HomeScreen extends Component {
  render() {
    return (
      <div>
        HomeScreen. rooms screen <br />
        {this.context.user.email} <br />
        <ul>
          <li>
            <Link to="/room/10">Izba 10</Link>
          </li>
          {this.context.user.is_super_admin && (
            <li>
              <Link to="/users">zoznam pouzivatelov</Link>
            </li>
          )}
          <li>
            <Link to={`/user/${this.context.user.uid}`}>moje konto</Link>
          </li>
          <li>
            <Link to="/user/10">cudzie konto - id 10</Link>
          </li>
        </ul>
      </div>
    );
  }
}

HomeScreen.contextType = UserContext;

export default HomeScreen;

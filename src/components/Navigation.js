import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserContext from "../UserContext";

class Navigation extends Component {
  getUserName = () => {
    return `${this.context.user.first_name} ${this.context.user.last_name}`;
  };

  render() {
    const user = this.context.user;

    return (
      <>
        {user && (
          <nav>
            <ul>
              <li>
                <Link to="/">Izby</Link>
              </li>
              {user.is_super_admin && (
                <li>
                  <Link to="/users">Účastníci</Link>
                </li>
              )}
              <li>
                <Link to={`/user/${user.uid}`}>{this.getUserName()}</Link>
              </li>
            </ul>
          </nav>
        )}
      </>
    );
  }
}

Navigation.contextType = UserContext;

export default Navigation;

import React, { Component } from "react";
import { Link } from "react-router-dom";

import UserContext from "../UserContext";
import { loadRoomList } from "../backend";
import BedList from "./BedList";

class HomeScreen extends Component {
  state = { roomList: [] };

  componentDidMount() {
    this.unsubscribeFromRoomList = loadRoomList({
      setRoomList: this.setRoomList
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromRoomList();
  }

  setRoomList = roomList => {
    this.setState({ roomList });
  };

  render() {
    return (
      <>
        {this.state.roomList.map(roomId => (
          <BedList key={roomId} uid={roomId} />
        ))}
        {this.renderTest()}
      </>
    );
  }

  renderTest = () => {
    return (
      <div style={{ border: "1px solid black" }}>
        <h3>test stuff todo</h3>
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
  };
}

HomeScreen.contextType = UserContext;

export default HomeScreen;

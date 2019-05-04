import React, { Component } from "react";

import UserContext from "../UserContext";
import { loadRoomWithId, updateDocumentProperty } from "../backend";

class BedList extends Component {
  state = {
    room: {
      bed_count: 0,
      name: "",
      is_supervisor_only: false,
      description: ""
    }
  };

  componentDidMount() {
    this.unsubscribeFromRoom = loadRoomWithId({
      uid: this.props.uid,
      setRoom: this.setRoom
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromRoom();
  }

  setRoom = room => {
    this.setState({ room });
  };

  handleSupervisorOnlyChange = async () => {
    if (!this.context.user.is_supervisor) {
      return;
    }

    try {
      await updateDocumentProperty({
        uid: { collection: "rooms", document: this.props.uid },
        property: "is_supervisor_only",
        value: !this.state.room.is_supervisor_only
      });
    } catch (err) {
      console.info("error", err);
    }
  };

  render() {
    const room = this.state.room;

    return (
      <div>
        <table>
          <caption>
            izba: <h2>{room.name}</h2>
          </caption>
          <thead>
            <tr>
              <th>účastník</th>
              <th>vek</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meno 1</td>
              <td>10</td>
            </tr>
            <tr>
              <td>Meno 2</td>
              <td>15</td>
            </tr>
            <tr>
              <td>Meno 3</td>
              <td>18</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>voľných miest:</td>
              <td>2</td>
            </tr>
          </tfoot>
        </table>
        <label>
          izba len pre vedúcich:
          <input
            type="checkbox"
            checked={room.is_supervisor_only}
            onChange={this.handleSupervisorOnlyChange}
          />
        </label>
        <div>{room.description}</div>
      </div>
    );
  }
}

BedList.contextType = UserContext;

export default BedList;

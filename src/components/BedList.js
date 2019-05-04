import React, { Component } from "react";

import UserContext from "../UserContext";
import {
  loadRoomWithId,
  loadBedList,
  addUserToBedList,
  updateDocumentProperty
} from "../backend";
import Bed from "./Bed";
import BedEmpty from "./BedEmpty";

class BedList extends Component {
  state = {
    room: {
      bed_count: 0,
      name: "",
      is_supervisor_only: false,
      description: ""
    },
    bedList: []
  };

  componentDidMount() {
    this.unsubscribeFromRoom = loadRoomWithId({
      uid: this.props.roomId,
      setRoom: this.setRoom
    });
    this.unsubscribeFromBedList = loadBedList({
      roomId: this.props.roomId,
      setBedList: this.setBedList
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromRoom();
    this.unsubscribeFromBedList();
  }

  setRoom = room => {
    this.setState({ room });
  };

  setBedList = bedList => {
    this.setState({ bedList });
  };

  getEmptyBedCount = () => {
    return this.state.room.bed_count - this.state.bedList.length;
  };

  generateEmptyBeds = count => {
    return Array.from({ length: count }, (_, index) => index);
  };

  reservationBookUp = async userId => {
    try {
      await updateDocumentProperty({
        uid: { collection: "users", document: userId },
        property: "room_id",
        value: this.props.roomId
      });
    } catch (err) {
      console.info("error", err);
    }

    try {
      await addUserToBedList({ roomId: this.props.roomId, userId });
    } catch (err) {
      console.info("error", err);
    }
  };

  reservationCancel = userId => {};

  handleSupervisorOnlyChange = async () => {
    if (!this.context.user.is_supervisor) {
      return;
    }

    try {
      await updateDocumentProperty({
        uid: { collection: "rooms", document: this.props.roomId },
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
            {this.state.bedList.map(userId => (
              <Bed key={userId} userId={userId} />
            ))}
            {this.generateEmptyBeds(this.getEmptyBedCount()).map(index => (
              <BedEmpty
                key={index}
                roomIsSupervisorOnly={this.state.room.is_supervisor_only}
                onReservationBookUp={this.reservationBookUp}
              />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">voľných miest: {this.getEmptyBedCount()}</td>
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

import React, { Component } from "react";

import UserContext from "../UserContext";

class BedEmpty extends Component {
  isAvailableBed = () => {
    return this.context.user.is_supervisor || !this.props.roomIsSupervisorOnly;
  };

  userIsAccommodated = () => {
    return this.context.user.room_id !== null;
  };

  handleReservationBookUp = async () => {
    if (this.userIsAccommodated() || !this.isAvailableBed()) {
      return;
    }

    try {
      await this.props.onReservationBookUp(this.context.user.uid);
    } catch (err) {
      console.info("error", err);
    }
  };

  render() {
    return (
      <tr
        style={{
          backgroundColor: this.userIsAccommodated()
            ? "lightgray"
            : this.isAvailableBed()
            ? "lightgreen"
            : "lightcoral"
        }}
        onClick={this.handleReservationBookUp}
      >
        <td colSpan="2">&nbsp;</td>
      </tr>
    );
  }
}

BedEmpty.contextType = UserContext;

export default BedEmpty;

import React from "react";

import "./BedEmpty.scss";
import useBedEmpty from "../../../hooks/room/useBedEmpty";

const BedEmpty = props => {
  const {
    user,
    isAvailableBed,
    userIsAccommodated,
    reservationBookUpHandler
  } = useBedEmpty(props.roomIsSupervisorOnly, props.onReservationBookUp);

  return (
    <tr
      className={
        userIsAccommodated(user)
          ? ""
          : isAvailableBed(user)
          ? "has-background-success item--clickable"
          : "has-background-danger item--forbidden"
      }
      onClick={reservationBookUpHandler}
    >
      <td colSpan={user.is_super_admin ? "3" : "2"}>&nbsp;</td>
    </tr>
  );
};

export default BedEmpty;

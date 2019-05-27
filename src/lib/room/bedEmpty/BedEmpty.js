import React from "react";

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
          ? "has-background-success"
          : "has-background-danger"
      }
      onClick={reservationBookUpHandler}
    >
      <td colSpan={user.is_super_admin ? "3" : "2"}>&nbsp;</td>
    </tr>
  );
};

export default BedEmpty;

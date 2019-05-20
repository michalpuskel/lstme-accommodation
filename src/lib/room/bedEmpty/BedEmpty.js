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
      style={{
        backgroundColor: userIsAccommodated(user)
          ? "lightgray"
          : isAvailableBed(user)
          ? "lightgreen"
          : "lightcoral"
      }}
      onClick={reservationBookUpHandler}
    >
      <td colSpan="2">&nbsp;</td>
    </tr>
  );
};

export default BedEmpty;

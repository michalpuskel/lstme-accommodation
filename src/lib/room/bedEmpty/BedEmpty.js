import React, { useContext } from "react";

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
          ? "beige"
          : isAvailableBed(user)
          ? "lightgreen"
          : "lightcoral"
      }}
      onClick={reservationBookUpHandler}
    >
      <td colSpan={user.is_super_admin ? "3" : "2"}>&nbsp;</td>
    </tr>
  );
};

export default BedEmpty;

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
      <td colSpan={2}>&nbsp;</td>

      {user.is_supervisor && user.is_super_admin && props.freeBedExists && (
        <td className="has-text-centered td--v-center bed__td--search">
          <button
            className="button is-link button--spread"
            onClick={props.onBookUp}
          >
            <span className="icon">
              <i className="fas fa-search" />
            </span>
          </button>
        </td>
      )}
    </tr>
  );
};

export default BedEmpty;

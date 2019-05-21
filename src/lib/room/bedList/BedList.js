import React from "react";
import { Link } from "react-router-dom";

import useBeds from "../../../hooks/room/useBeds";
import useEmptyBedCount from "../../../hooks/room/useEmptyBedCount";
import useEmptyBeds from "../../../hooks/room/useEmptyBeds";
import useReservationBookUp from "../../../hooks/room/useReservationBookUp";
import useReservationCancel from "../../../hooks/room/useReservationCancel";
import useChangeSupervisorOnlyHandler from "../../../hooks/room/useChangeSupervisorOnlyHandler";

import Bed from "../bed/Bed";
import BedEmpty from "../bedEmpty/BedEmpty";

const BedList = props => {
  const bedList = useBeds(props.uid);
  const emptyBedCount = useEmptyBedCount();
  const emptyBeds = useEmptyBeds();
  const reservationBookUp = useReservationBookUp(props.uid);
  const reservationCancel = useReservationCancel(props.uid);
  const changeSupervisorOnlyHandler = useChangeSupervisorOnlyHandler(props.uid);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th colSpan="2">
              <Link to={`/room/${props.uid}`}> izba: {props.name} </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(bedList).map(userId => (
            <Bed
              key={userId}
              userId={userId}
              onReservationCancel={reservationCancel}
            />
          ))}
          {emptyBeds(
            emptyBedCount(props.bed_count, Object.keys(bedList).length)
          ).map(index => (
            <BedEmpty
              key={index}
              roomIsSupervisorOnly={props.is_supervisor_only}
              onReservationBookUp={reservationBookUp}
            />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              voľných miest:{" "}
              {emptyBedCount(props.bed_count, Object.keys(bedList).length)}
            </td>
          </tr>
        </tfoot>
      </table>
      <label>
        izba len pre vedúcich:
        <input
          type="checkbox"
          checked={props.is_supervisor_only}
          onChange={changeSupervisorOnlyHandler}
        />
      </label>
      <div>{props.description}</div>
    </div>
  );
};

export default BedList;

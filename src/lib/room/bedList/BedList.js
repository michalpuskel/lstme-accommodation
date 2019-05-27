import React, { useContext } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../../config/UserContext";
import useBeds from "../../../hooks/room/useBeds";
import useEmptyBedCount from "../../../hooks/room/useEmptyBedCount";
import useEmptyBeds from "../../../hooks/room/useEmptyBeds";
import useReservationBookUp from "../../../hooks/room/useReservationBookUp";
import useReservationCancel from "../../../hooks/room/useReservationCancel";
import useChangeSupervisorOnlyHandler from "../../../hooks/room/useChangeSupervisorOnlyHandler";
import useRoomDelete from "../../../hooks/room/useRoomDelete";
import useBedAdd from "../../../hooks/room/useBedAdd";

import Bed from "../bed/Bed";
import BedEmpty from "../bedEmpty/BedEmpty";

const BedList = props => {
  const user = useContext(UserContext);
  const bedList = useBeds(props.uid);
  const emptyBedCount = useEmptyBedCount();
  const emptyBeds = useEmptyBeds();
  const reservationBookUp = useReservationBookUp(props.uid);
  const reservationCancel = useReservationCancel(props.uid);
  const changeSupervisorOnlyHandler = useChangeSupervisorOnlyHandler(props.uid);
  const roomDelete = useRoomDelete(props.uid, bedList);
  const bedAdd = useBedAdd(props.uid);

  if (props.deleteRooms) {
    roomDelete();
  }

  return (
    <div className="column is-narrow">
      {user.is_supervisor && props.detail && (
        <button onClick={roomDelete}>Vymazať izbu</button>
      )}

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

          <tr>
            <td colSpan="2">
              <label>
                izba len pre vedúcich:
                <input
                  type="checkbox"
                  checked={props.is_supervisor_only}
                  onChange={changeSupervisorOnlyHandler}
                />
              </label>
            </td>
          </tr>

          {props.detail && (
            <>
              <tr>
                <td colSpan="2">{props.description}</td>
              </tr>

              {user.is_supervisor && (
                <tr>
                  <td colSpan="2">
                    <button onClick={bedAdd}>Pridať posteľ</button>
                  </td>
                </tr>
              )}
            </>
          )}
        </tfoot>
      </table>
    </div>
  );
};

export default BedList;

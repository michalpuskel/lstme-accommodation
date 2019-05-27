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
import useModal from "../../../hooks/utils/useModal";
import useTrue from "../../../hooks/utils/useTrue";

import Bed from "../bed/Bed";
import BedEmpty from "../bedEmpty/BedEmpty";
import Modal from "../../../lib/modal/Modal";

// TODO refactor buttons
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

  const deleteRoom = useModal();
  const trueFunction = useTrue();

  if (props.deleteRooms) {
    roomDelete();
  }

  // TODO refactor
  return (
    <>
      {user.is_supervisor && props.detail && (
        <div className="column is-full">
          <Modal
            title={`Vymazanie izby: ${props.name}`}
            button={{
              action: {
                label: "Vymazať izbu",
                check: trueFunction,
                class: "is-danger"
              },
              dismiss: {
                label: "Zrušiť",
                handler: deleteRoom.toggleModal
              }
            }}
            onSubmit={roomDelete}
            active={deleteRoom.showModal}
          >
            Skutočne si praješ vymazať izbu: <em>{props.name}</em>? Je to{" "}
            <strong>nenávratná</strong> akcia.
          </Modal>

          <div className="level auth__buttons">
            <div className="level-left">
              <div className="level-item">
                <button
                  className="button is-success is-outlined"
                  onClick={bedAdd}
                >
                  Pridať posteľ
                </button>
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <button
                  className="button is-danger is-outlined"
                  onClick={deleteRoom.toggleModal}
                >
                  Vymazať izbu
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="column is-narrow">
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
              <tr>
                <td colSpan="2">{props.description}</td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default BedList;

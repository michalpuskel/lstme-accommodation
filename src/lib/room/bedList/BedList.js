import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import "./BedList.scss";
import UserContext from "../../../config/UserContext";
import useBeds from "../../../hooks/room/useBeds";
import useEmptyBedCount from "../../../hooks/room/useEmptyBedCount";
import useEmptyBeds from "../../../hooks/room/useEmptyBeds";
import useFreeBedExists from "../../../hooks/room/useFreeBedExists";
import useReservationBookUp from "../../../hooks/room/useReservationBookUp";
import useReservationCancel from "../../../hooks/room/useReservationCancel";
import useChangeSupervisorOnlyHandler from "../../../hooks/room/useChangeSupervisorOnlyHandler";
import useRoomDelete from "../../../hooks/room/useRoomDelete";
import useBedAdd from "../../../hooks/room/useBedAdd";
import useBedDelete from "../../../hooks/room/useBedDelete";
import useSubmitRoomEditHandler from "../../../hooks/room/useSubmitRoomEditHandler";
import useFormEditRoom from "../../../hooks/room/useFormEditRoom";
import useModal from "../../../hooks/utils/useModal";
import useValidateNewRoomName from "../../../hooks/room/useValidateNewRoomName";
import useTrue from "../../../hooks/utils/useTrue";

import Bed from "../bed/Bed";
import BedEmpty from "../bedEmpty/BedEmpty";
import FormEditRoom from "../../../lib/room/formEditRoom/FormEditRoom";
import FormBookUpBed from "../formBookUpBed";
import Modal from "../../../lib/modal/Modal";
import useHomelessUsers from "../../../hooks/room/useHomelessUsers";
import useSubmitBookUpBedHandler from "../../../hooks/room/useSubmitBookUpBedHandler";

// TODO refactor buttons
const BedList = props => {
  const bedList = useBeds(props.uid);
  const user = useContext(UserContext);

  const emptyBedCount = useEmptyBedCount();
  const emptyBeds = useEmptyBeds();
  const freeBedExists = useFreeBedExists(
    props.bed_count,
    Object.keys(bedList).length
  );

  const reservationBookUp = useReservationBookUp(props.uid);
  const reservationCancel = useReservationCancel(props.uid);
  const changeSupervisorOnlyHandler = useChangeSupervisorOnlyHandler(props.uid);

  const roomDelete = useRoomDelete(props.uid, bedList);
  const bedAdd = useBedAdd(props.uid);
  const bedDelete = useBedDelete(props.uid);

  const deleteRoomModal = useModal();
  const trueFunction = useTrue();

  const { input, handler, id } = useFormEditRoom(props.name, props.description);
  const validName = useValidateNewRoomName(input.name);
  const editRoomModal = useModal();
  const submitRoomEditHandler = useSubmitRoomEditHandler(props.uid, input);

  const [bedBookUpUserId, setBedBookUpUserId] = useState();
  const homelessUsers = useHomelessUsers(
    props.is_supervisor_only,
    setBedBookUpUserId
  );
  const reservationBookUpModal = useModal();
  const validBookUp = Object.keys(homelessUsers).length > 0;
  const submitBookUpBedHandler = useSubmitBookUpBedHandler(
    homelessUsers[bedBookUpUserId],
    props.uid,
    validBookUp
  );

  if (props.deleteRooms) {
    roomDelete();
  }

  // TODO refactor
  return (
    <>
      {user.is_supervisor && props.detail && (
        <>
          <div className="column is-full">
            <div className="level room-detail__buttons">
              <div className="level-left">
                <div className="level-item room-detail__button--margin">
                  <button
                    className="button is-info is-outlined"
                    onClick={editRoomModal.toggleModal}
                  >
                    Upraviť izbu
                  </button>
                </div>
              </div>

              <div className="level-item room-detail__buttons--middle">
                <div className="columns">
                  <div className="column has-text-centered">
                    <button
                      className="button is-success is-outlined"
                      onClick={bedAdd}
                    >
                      Pridať posteľ
                    </button>
                  </div>

                  <div className="column has-text-centered">
                    <button
                      className="button is-danger is-outlined"
                      onClick={bedDelete}
                      disabled={!freeBedExists()}
                    >
                      Odobrať posteľ
                    </button>
                  </div>
                </div>
              </div>

              <div className="level-right">
                <div className="level-item room-detail__button--margin">
                  <button
                    className="button is-danger is-outlined"
                    onClick={deleteRoomModal.toggleModal}
                  >
                    Vymazať izbu
                  </button>
                </div>
              </div>
            </div>
          </div>

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
                handler: deleteRoomModal.toggleModal
              }
            }}
            onSubmit={roomDelete}
            active={deleteRoomModal.showModal}
          >
            Skutočne si praješ vymazať izbu: <em>{props.name}</em>? Je to{" "}
            <strong>nenávratná</strong> akcia.
          </Modal>

          <Modal
            title="Úprava izby"
            button={{
              action: {
                label: "Uložiť úpravy",
                check: validName,
                class: "is-info"
              },
              dismiss: {
                label: "Zrušiť",
                handler: editRoomModal.toggleModal
              }
            }}
            onSubmit={submitRoomEditHandler}
            active={editRoomModal.showModal}
          >
            <FormEditRoom input={input} handler={handler} id={id} />
          </Modal>
        </>
      )}

      {user.is_supervisor && user.is_super_admin && (
        <Modal
          title="Rezervácia postele"
          button={{
            action: {
              label: "Rezervovať posteľ",
              check: () => !!bedBookUpUserId,
              class: "is-primary"
            },
            dismiss: {
              label: "Zrušiť",
              handler: reservationBookUpModal.toggleModal
            }
          }}
          onSubmit={submitBookUpBedHandler}
          active={reservationBookUpModal.showModal}
        >
          <FormBookUpBed
            homelessUsers={homelessUsers}
            userId={bedBookUpUserId}
            setUserId={setBedBookUpUserId}
          />
        </Modal>
      )}

      <div className="column is-narrow">
        <div className="box">
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th
                  colSpan={user.is_super_admin ? "3" : "2"}
                  className="has-text-centered"
                >
                  <Link to={`/room/${props.uid}`}> izba: {props.name} </Link>
                </th>
              </tr>

              <tr>
                <td
                  colSpan={user.is_super_admin ? 3 : 2}
                  className="has-text-centered"
                >
                  {user.is_supervisor ? (
                    <div className="field">
                      <input
                        className="is-checkradio is-success"
                        id={`room_${props.uid}`}
                        name={`room_${props.uid}`}
                        type="checkbox"
                        checked={props.is_supervisor_only}
                        onChange={changeSupervisorOnlyHandler}
                      />
                      <label htmlFor={`room_${props.uid}`}>
                        Izba len pre vedúcich
                      </label>
                    </div>
                  ) : (
                    <em>
                      pre {props.is_supervisor_only ? "inštruktorov" : "deti"}
                    </em>
                  )}
                </td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(bedList).map(userId => (
                <Bed
                  key={userId}
                  userId={userId}
                  onReservationCancel={reservationCancel}
                  detail={props.detail}
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
              {user.is_supervisor && user.is_super_admin && freeBedExists() && (
                <tr>
                  <td colSpan={3} className="has-text-centered td--v-center">
                    <button
                      className="button is-primary is-outlined"
                      onClick={reservationBookUpModal.toggleModal}
                    >
                      Rezervovať posteľ
                    </button>
                  </td>
                </tr>
              )}

              <tr>
                <td
                  colSpan={user.is_super_admin ? "3" : "2"}
                  className="has-text-centered"
                >
                  voľných miest:{" "}
                  {emptyBedCount(props.bed_count, Object.keys(bedList).length)}
                </td>
              </tr>

              {props.detail && (
                <tr>
                  <td colSpan={user.is_super_admin ? "3" : "2"}>
                    <div className="field">
                      <div className="control">
                        <textarea
                          className="textarea"
                          placeholder="Bližší popis izby"
                          rows={4}
                          value={props.description}
                          readOnly
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
};

export default BedList;

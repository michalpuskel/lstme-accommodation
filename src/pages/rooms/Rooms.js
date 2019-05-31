import React, { useContext } from "react";

import UserContext from "../../config/UserContext";
import useRooms from "../../hooks/room/useRooms";
import useRoomsDeleteAll from "../../hooks/room/useRoomsDeleteAll";
import useSubmitRoomAddHandler from "../../hooks/room/useSubmitRoomAddHandler";
import useFormNewRoom from "../../hooks/room/useFormNewRoom";
import useModal from "../../hooks/utils/useModal";
import useValidateNewRoomName from "../../hooks/room/useValidateNewRoomName";
import useTrue from "../../hooks/utils/useTrue";

import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";
import FormNewRoom from "../../lib/room/formNewRoom/FormNewRoom";
import Modal from "../../lib/modal/Modal";

const Rooms = () => {
  const user = useContext(UserContext);
  const roomList = useRooms();
  const { deleteRooms, roomsDeleteAll, enableRoomsAdd } = useRoomsDeleteAll();

  const { input, handler, id } = useFormNewRoom();
  const validName = useValidateNewRoomName(input.name);
  const newRoomModal = useModal();
  const submitRoomAddHandler = useSubmitRoomAddHandler(input, enableRoomsAdd);

  const deleteAllModal = useModal();
  const trueFunction = useTrue();

  //TODO refactor buttons
  return (
    <Layout title="Rezervácia ubytovania">
      {user.is_supervisor && (
        <>
          <Modal
            title="Nová izba"
            button={{
              action: {
                label: "Vytvoriť izbu",
                check: validName,
                class: "is-success"
              },
              dismiss: {
                label: "Zrušiť",
                handler: newRoomModal.toggleModal
              }
            }}
            onSubmit={submitRoomAddHandler}
            active={newRoomModal.showModal}
          >
            <FormNewRoom input={input} handler={handler} id={id} />
          </Modal>

          <Modal
            title="Vymazanie izieb"
            button={{
              action: {
                label: "Vymazať všetky izby",
                check: trueFunction,
                class: "is-danger"
              },
              dismiss: {
                label: "Zrušiť",
                handler: deleteAllModal.toggleModal
              }
            }}
            onSubmit={roomsDeleteAll}
            active={deleteAllModal.showModal}
          >
            Skutočne si praješ vymazať všetky izby? Je to{" "}
            <strong>nenávratná</strong> akcia.
          </Modal>

          <div className="level">
            <div className="level-left">
              <div className="level-item">
                <button
                  className="button is-success is-outlined"
                  onClick={newRoomModal.toggleModal}
                >
                  Pridať izbu
                </button>
              </div>
            </div>

            <div className="level-right">
              <div className="level-item">
                <button
                  className="button is-danger is-outlined"
                  onClick={deleteAllModal.toggleModal}
                >
                  Vymazať všetky izby
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="columns is-multiline is-centered is-vcentered is-variable is-3">
        {Object.keys(roomList).map(roomId => (
          <BedList
            key={roomId}
            {...roomList[roomId]}
            deleteRooms={deleteRooms}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Rooms;

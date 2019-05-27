import React, { useContext } from "react";

import UserContext from "../../config/UserContext";
import useRooms from "../../hooks/room/useRooms";
import useRoomsDeleteAll from "../../hooks/room/useRoomsDeleteAll";
import useFormNewRoom from "../../hooks/room/useFormNewRoom";
import useSubmitRoomAddHandler from "../../hooks/room/useSubmitRoomAddHandler";
import useModalNewRoom from "../../hooks/modal/useModalNewRoom";
import useValidateNewRoomName from "../../hooks/room/useValidateNewRoomName";

import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";
import FormNewRoom from "../../lib/room/formNewRoom/FormNewRoom";
import Modal from "../../lib/modal/Modal";

const Rooms = () => {
  const user = useContext(UserContext);
  const roomList = useRooms();
  const { deleteRooms, roomsDeleteAll, enableRoomsAdd } = useRoomsDeleteAll();

  const { input, handler } = useFormNewRoom();
  const validName = useValidateNewRoomName(input.name);
  const newRoom = useModalNewRoom();
  const submitRoomAddHandler = useSubmitRoomAddHandler(input, enableRoomsAdd);

  return (
    <Layout title="Rezervácia ubytovania">
      {user.is_supervisor && (
        <>
          <Modal
            title="Nová izba"
            button={{
              action: {
                label: "Vytvoriť izbu",
                check: validName
              },
              dismiss: {
                label: "Zrušiť",
                handler: newRoom.toggleModalNewRoom
              }
            }}
            onSubmit={submitRoomAddHandler}
            active={newRoom.showModalNewRoom}
          >
            <FormNewRoom input={input} handler={handler} />
          </Modal>

          <button
            className="button is-success is-outlined"
            onClick={newRoom.toggleModalNewRoom}
          >
            Pridať izbu
          </button>

          <button onClick={roomsDeleteAll}>Vymazať všetky izby</button>
        </>
      )}
      {Object.keys(roomList).map(roomId => (
        <BedList key={roomId} {...roomList[roomId]} deleteRooms={deleteRooms} />
      ))}
    </Layout>
  );
};

export default Rooms;

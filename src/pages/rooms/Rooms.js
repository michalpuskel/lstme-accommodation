import React, { useContext } from "react";

import UserContext from "../../config/UserContext";
import useRooms from "../../hooks/room/useRooms";
import useRoomsDeleteAll from "../../hooks/room/useRoomsDeleteAll";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";
import FormNewRoom from "../../lib/room/formNewRoom/FormNewRoom";

import { adminAuth } from "../../config/firebaseAdmin";

const Rooms = async () => {
  const user = useContext(UserContext);
  const roomList = useRooms();
  const { deleteRooms, roomsDeleteAll, enableRoomsAdd } = useRoomsDeleteAll();

  let t = null;
  try {
    t = await adminAuth.getUser(user.uid);
    console.log(t);
  } catch (e) {
    console.error(e);
  }

  return (
    <Layout title="Rezervácia ubytovania">
      {user.is_supervisor && (
        <>
          <FormNewRoom onRoomAdd={enableRoomsAdd} />
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

import React, { useContext } from "react";

import UserContext from "../../config/UserContext";
import useRooms from "../../hooks/room/useRooms";
import useRoomsDeleteAll from "../../hooks/room/useRoomsDeleteAll";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";

const Rooms = () => {
  const user = useContext(UserContext);
  const roomList = useRooms();
  const roomsDeleteAll = useRoomsDeleteAll(Object.keys(roomList));

  return (
    <Layout title="Rezervácia ubytovania">
      {user.is_supervisor && (
        <button onClick={roomsDeleteAll}>Vymazať všetky izby</button>
      )}
      {Object.keys(roomList).map(roomId => (
        <BedList key={roomId} {...roomList[roomId]} />
      ))}
    </Layout>
  );
};

export default Rooms;

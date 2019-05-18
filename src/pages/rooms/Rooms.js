import React from "react";

import useRooms from "../../hooks/room/useRooms";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";

const Rooms = () => {
  const roomList = useRooms();

  return (
    <Layout title="Rezervácia ubytovania">
      {Object.keys(roomList).map(roomId => (
        <BedList key={roomId} {...roomList[roomId]} />
      ))}
    </Layout>
  );
};

export default Rooms;

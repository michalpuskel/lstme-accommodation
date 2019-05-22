import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import UserContext from "../../config/UserContext";
import useRoom from "../../hooks/room/useRoom";
import useRoomDelete from "../../hooks/room/useRoomDelete";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";

const RoomDetail = props => {
  const user = useContext(UserContext);
  const roomId = props.match.params.roomId;
  const room = useRoom(roomId);
  const roomDelete = useRoomDelete(roomId);

  return (
    <Layout title={room ? `Rezervácia izby: ${room.name}` : ""}>
      {room === undefined ? (
        <div>Loading...</div>
      ) : room === null ? (
        <Redirect to="/" />
      ) : (
        <>
          {user.is_supervisor && (
            <button onClick={roomDelete}>Vymazať izbu</button>
          )}
          <BedList {...room} />
        </>
      )}
    </Layout>
  );
};

export default RoomDetail;

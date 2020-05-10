import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import useRoom from "../../hooks/room/useRoom";
import useRoomBreadcrumb from "../../hooks/room/useRoomBreadcrumb";

import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";
import Loading from "../../lib/loading/Loading";
import UserContext from "../../config/UserContext";

const RoomDetail = (props) => {
  const room = useRoom(props.match.params.roomId);
  const breadcrumb = useRoomBreadcrumb();

  const user = useContext(UserContext);

  return (
    <Layout
      title={room ? `Rezervácia izby: ${room.name}` : ""}
      breadcrumb={breadcrumb(room)}
    >
      {room === undefined ? (
        <Loading />
      ) : room === null || room.event_id !== user.event_id ? (
        <Redirect to="/" />
      ) : (
        <div className="columns is-multiline is-centered is-variable is-3">
          <BedList {...room} detail={true} />
        </div>
      )}
    </Layout>
  );
};

export default RoomDetail;

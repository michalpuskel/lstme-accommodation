import React from "react";
import { Redirect } from "react-router-dom";

import useRoom from "../../hooks/room/useRoom";
import useRoomBreadcrumb from "../../hooks/room/useRoomBreadcrumb";

import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";
import Loading from "../../lib/loading/Loading";

const RoomDetail = props => {
  const room = useRoom(props.match.params.roomId);
  const breadcrumb = useRoomBreadcrumb();

  console.log("ROOM", room);

  return (
    <Layout
      title={room ? `Rezervácia izby: ${room.name}` : ""}
      breadcrumb={breadcrumb(room)}
    >
      {room === undefined ? (
        <Loading />
      ) : room === null ? (
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

import React from "react";
import { Redirect } from "react-router-dom";

import useRoom from "../../hooks/room/useRoom";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";
import Loading from "../../lib/loading/Loading";

const RoomDetail = props => {
  const room = useRoom(props.match.params.roomId);
  const breadcrumb = [
    { path: "/", label: "Izby" },
    { path: `/room/${room && room.uid}`, label: `Izba: ${room && room.name}` }
  ];

  return (
    <Layout
      title={room ? `Rezervácia izby: ${room.name}` : ""}
      breadcrumb={breadcrumb}
    >
      {room === undefined ? (
        <Loading />
      ) : room === null ? (
        <Redirect to="/" />
      ) : (
        <BedList {...room} detail={true} />
      )}
    </Layout>
  );
};

export default RoomDetail;

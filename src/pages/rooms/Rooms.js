import React, { useReducer, useEffect } from "react";

import { database } from "../../config/firebase";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";

const Rooms = () => {
  const reduceUpdateRoomList = (prevRoomList, action) => {
    switch (action.type) {
      case "added":
      case "modified":
        return { ...prevRoomList, [action.data.uid]: action.data };
      case "removed":
        const roomList = { ...prevRoomList };
        delete roomList[action.data.uid];
        return roomList;
      default:
        throw new Error("error: Invalid reduceUpdateRoomList action:", action);
    }
  };

  const [roomList, dispatchUpdateRoomList] = useReducer(
    reduceUpdateRoomList,
    {}
  );

  useEffect(() => {
    const roomListRef = database.collection("rooms").orderBy("timestamp");
    const unsubscribeFromRoomList = roomListRef.onSnapshot(
      roomListSnapshot => {
        roomListSnapshot.docChanges().forEach(roomChange => {
          dispatchUpdateRoomList({
            type: roomChange.type,
            data: roomChange.doc.data()
          });
        });
      },
      err => {
        console.info("error", err);
      }
    );

    return () => {
      unsubscribeFromRoomList();
    };
  }, []);

  return (
    <Layout title="Rezervácia ubytovania">
      {Object.keys(roomList).map(roomId => (
        <BedList key={roomId} room={roomList[roomId]} />
      ))}
    </Layout>
  );
};

export default Rooms;

import React, { useReducer, useEffect } from "react";

import { database } from "../../config/firebase";
import Layout from "../../application/layout/layout/Layout";
import BedList from "../../lib/room/bedList/BedList";

const Rooms = () => {
  const reduceUpdateRoomList = (prevRoomList, action) => {
    console.log(action);
    switch (action.type) {
      case "added":
      case "modified":
        prevRoomList["_" + action.data.uid[3]] = action.data;
        break;
      case "removed":
        delete prevRoomList[action.data.uid];
        break;
      default:
        throw new Error("error: Invalid reduceUpdateRoomList action:", action);
    }

    console.log(prevRoomList);
    return prevRoomList;
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

  const r = roomList;
  console.log("--", Object.keys(r).length);
  console.log("**", r);
  console.log("RL", roomList);
  console.log("lengthh", Object.keys(roomList).length);
  console.log(
    "TEST",
    Object.keys(roomList),
    roomList,
    Object.keys({ a: 1, b: 2 })
  );

  return (
    <Layout title="Rezervácia ubytovania">
      <>
        {Object.keys(roomList).map(roomId => (
          <>
            <BedList key={roomId} room={roomList[roomId]} />
            {console.log(roomId)}
          </>
        ))}
      </>
    </Layout>
  );
};

export default Rooms;

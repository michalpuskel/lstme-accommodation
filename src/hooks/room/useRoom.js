import { useState, useEffect } from "react";

import { database } from "../../config/firebase";

const useRoom = roomId => {
  const [room, setRoom] = useState(undefined);

  useEffect(() => {
    const ref = database.collection("rooms").doc(roomId);
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        const data = snapshot.data();
        setRoom(data === undefined ? null : data);
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
    };
  }, [roomId]);

  return room;
};

export default useRoom;

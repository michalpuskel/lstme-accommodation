import { useState, useEffect } from "react";

import { database } from "../../config/firebase";
import useUnbreakableSpaces from "../utils/useUnbreakableSpaces";

const useRoom = roomId => {
  const [room, setRoom] = useState(undefined);
  const glueFormat = useUnbreakableSpaces();

  useEffect(() => {
    if (!roomId) {
      setRoom(null);
    } else {
      const ref = database.collection("rooms").doc(roomId);
      const unsubscribe = ref.onSnapshot(
        snapshot => {
          const data = snapshot.data();
          if (data === undefined) {
            setRoom(null);
          } else {
            data.name = glueFormat(data.name);
            setRoom(data);
          }
        },
        error => console.error(error)
      );

      return () => {
        unsubscribe();
        // setRoom(undefined);
      };
    }
  }, [glueFormat, roomId]);

  return room;
};

export default useRoom;

import { useCallback } from "react";

import { database } from "../../config/firebase";
import useBeds from "../../hooks/room/useBeds";

const useRoomDelete = roomId => {
  //TODO transaction 'collection' read / delete
  const accommodatedUsers = useBeds(roomId);

  const roomDelete = useCallback(async () => {
    const roomRef = database.collection("rooms").doc(roomId);
    const bedsRef = database
      .collection("rooms")
      .doc(roomId)
      .collection("beds");

    try {
      await database.runTransaction(async transaction => {
        Object.keys(accommodatedUsers).map(userId => {
          const userRef = database.collection("users").doc(userId);
          transaction.update(userRef, { room_id: null });
          transaction.delete(bedsRef.doc(userId));
          return userRef;
        });

        transaction.delete(roomRef);
      });
    } catch (error) {
      console.error(error);
    }
  }, [roomId, accommodatedUsers]);

  return roomDelete;
};

export default useRoomDelete;

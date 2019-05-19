import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useReservationBookUp = roomId => {
  const reservationBookUp = useCallback(
    async userId => {
      //TODO transaction begin
      const userRef = database.collection("users").doc(userId);
      try {
        await userRef.update({ room_id: roomId });
      } catch (error) {
        console.error(error);
      }

      const bedRef = database
        .collection("rooms")
        .doc(roomId)
        .collection("beds")
        .doc(userId);
      try {
        await bedRef.set({ timestamp: dbTimestamp });
      } catch (error) {
        console.error(error);
      }
      //TODO transaction end
    },
    [roomId]
  );

  return reservationBookUp;
};

export default useReservationBookUp;

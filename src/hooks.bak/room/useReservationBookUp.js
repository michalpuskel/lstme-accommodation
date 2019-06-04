import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useReservationBookUp = roomId => {
  const reservationBookUp = useCallback(
    async userId => {
      const batch = database.batch();

      const userRef = database.collection("users").doc(userId);
      batch.update(userRef, { room_id: roomId });

      const bedRef = database
        .collection("rooms")
        .doc(roomId)
        .collection("beds")
        .doc(userId);
      batch.set(bedRef, { timestamp: dbTimestamp });

      try {
        await batch.commit();
      } catch (error) {
        console.error(error);
      }
    },
    [roomId]
  );

  return reservationBookUp;
};

export default useReservationBookUp;

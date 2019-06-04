import { useCallback } from "react";

import { database } from "../../config/firebase";

const useReservationCancel = roomId => {
  const reservationCancel = useCallback(
    async userId => {
      const batch = database.batch();

      const userRef = database.collection("users").doc(userId);
      batch.update(userRef, { room_id: null });

      const bedRef = database
        .collection("rooms")
        .doc(roomId)
        .collection("beds")
        .doc(userId);
      batch.delete(bedRef);

      try {
        await batch.commit();
      } catch (error) {
        console.error(error);
      }
    },
    [roomId]
  );

  return reservationCancel;
};

export default useReservationCancel;

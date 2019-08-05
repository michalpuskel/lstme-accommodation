import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useRoomDelete = (roomId, accommodatedUsers) => {
  //TODO transaction 'collection' read / delete
  const roomDelete = useCallback(
    async event => {
      event && event.preventDefault();

      const roomRef = database.collection("rooms").doc(roomId);
      const bedsRef = database
        .collection("rooms")
        .doc(roomId)
        .collection("beds");

      try {
        await database.runTransaction(async transaction => {
          const swappingUsers = [];

          Object.keys(accommodatedUsers).map(async userId => {
            const userRef = database.collection("users").doc(userId);
            const userDoc = await transaction.get(userRef);
            const { swap_sent_to_id, swap_received_from_id } = userDoc.data();

            const swapPartnerId = swap_sent_to_id || swap_received_from_id;
            if (swapPartnerId) {
              swappingUsers.push(userId);
              swappingUsers.push(swapPartnerId);
            }
          });

          const roomDoc = await transaction.get(roomRef);
          const room = roomDoc.data();

          swappingUsers.map(userId => {
            const userRef = database.collection("users").doc(userId);
            transaction.update(userRef, {
              swap_sent_to_id: null,
              swap_received_from_id: null
            });

            const notificationRef = database
              .collection("notifications")
              .doc(userId)
              .collection("denials")
              .doc();
            transaction.set(notificationRef, {
              uid: notificationRef.id,
              room: room.name,
              type: "room-delete",
              timestamp: dbTimestamp
            });
            return userRef;
          });

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
    },
    [roomId, accommodatedUsers]
  );

  return roomDelete;
};

export default useRoomDelete;

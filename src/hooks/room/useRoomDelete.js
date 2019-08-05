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
        // const swappingUsers = [];

        // Object.keys(accommodatedUsers).map(async userId => {
        //   const userRef = database.collection("users").doc(userId);
        //   const userDoc = await userRef.get();
        //   const { swap_sent_to_id, swap_received_from_id } = userDoc.data();

        //   const swapPartnerId = swap_sent_to_id || swap_received_from_id;
        //   if (swapPartnerId) {
        //     swappingUsers.push(userId);
        //     swappingUsers.push(swapPartnerId);
        //   }
        // });

        // const roomDoc = await roomRef.get();
        // const room = roomDoc.data();

        // swappingUsers.map(async userId => {
        //   const userRef = database.collection("users").doc(userId);
        //   await userRef.update({
        //     swap_sent_to_id: null,
        //     swap_received_from_id: null
        //   });

        //   const notificationRef = database
        //     .collection("notifications")
        //     .doc(userId)
        //     .collection("denials")
        //     .doc();
        //   await notificationRef.set({
        //     uid: notificationRef.id,
        //     room: room.name,
        //     type: "room-delete",
        //     timestamp: dbTimestamp
        //   });
        //   return userRef;
        // });

        // Object.keys(accommodatedUsers).map(async userId => {
        //   const userRef = database.collection("users").doc(userId);
        //   await userRef.update({ room_id: null });
        //   bedsRef.doc(userId).delete();
        //   return userRef;
        // });

        await roomRef.delete();
      } catch (error) {
        console.error(error);
      }
    },
    [roomId]
  );

  return roomDelete;
};

export default useRoomDelete;

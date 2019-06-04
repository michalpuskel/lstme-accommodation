import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useSwapAccept = (senderId, recipientId) => {
  const swapAccept = useCallback(async () => {
    const senderRef = database.collection("users").doc(senderId);
    const recipientRef = database.collection("users").doc(recipientId);

    try {
      await database.runTransaction(async transaction => {
        const senderDoc = await transaction.get(senderRef);
        const senderRoomId = senderDoc.data().room_id;

        const recipientDoc = await transaction.get(recipientRef);
        const recipientRoomId = recipientDoc.data().room_id;

        transaction.update(senderRef, {
          room_id: recipientRoomId,
          swap_sent_to_id: null
        });
        transaction.update(recipientRef, {
          room_id: senderRoomId,
          swap_received_from_id: null
        });

        const senderOldBedRef = database
          .collection("rooms")
          .doc(senderRoomId)
          .collection("beds")
          .doc(senderId);
        transaction.delete(senderOldBedRef);

        const recipientOldBedRef = database
          .collection("rooms")
          .doc(recipientRoomId)
          .collection("beds")
          .doc(recipientId);
        transaction.delete(recipientOldBedRef);

        const senderNewBedRef = database
          .collection("rooms")
          .doc(recipientRoomId)
          .collection("beds")
          .doc(senderId);
        transaction.set(senderNewBedRef, { timestamp: dbTimestamp });

        const recipientNewBedRef = database
          .collection("rooms")
          .doc(senderRoomId)
          .collection("beds")
          .doc(recipientId);
        transaction.set(recipientNewBedRef, { timestamp: dbTimestamp });
      });
    } catch (error) {
      console.error(error);
    }
  }, [senderId, recipientId]);

  return swapAccept;
};

export default useSwapAccept;

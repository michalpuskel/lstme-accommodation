import { useCallback } from "react";

import { database, dbTimestamp } from "../../config/firebase";

const useSwapDeny = (senderId, recipientInfo, recipientRoom, type) => {
  // console.log(type); // TODO

  const swapDeny = useCallback(async () => {
    const batch = database.batch();

    const senderRef = database.collection("users").doc(senderId);
    batch.update(senderRef, { swap_sent_to_id: null });

    const recipientRef = database.collection("users").doc(recipientInfo.uid());
    batch.update(recipientRef, { swap_received_from_id: null });

    const notificationRef = database
      .collection("notifications")
      .doc(senderId)
      .collection("denials")
      .doc();
    batch.set(notificationRef, {
      uid: notificationRef.id,
      user: {
        first_name: recipientInfo.first_name(),
        last_name: recipientInfo.last_name()
      },
      room: recipientRoom.name(),
      type,
      timestamp: dbTimestamp
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  }, [recipientInfo, recipientRoom, senderId, type]);

  return swapDeny;
};

export default useSwapDeny;

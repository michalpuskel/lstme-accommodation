import { useCallback } from "react";

import { database } from "../../config/firebase";

const useSwapRequest = (senderId, recipientId) => {
  const swapRequest = useCallback(async () => {
    const batch = database.batch();

    const senderRef = database.collection("users").doc(senderId);
    batch.update(senderRef, { swap_sent_to_id: recipientId });

    const recipientRef = database.collection("users").doc(recipientId);
    batch.update(recipientRef, { swap_received_from_id: senderId });

    try {
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  }, [senderId, recipientId]);

  return swapRequest;
};

export default useSwapRequest;

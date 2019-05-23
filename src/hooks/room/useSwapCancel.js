import { useCallback } from "react";

import { database } from "../../config/firebase";

const useSwapCancel = (senderId, recipientId) => {
  const swapCancel = useCallback(async () => {
    const batch = database.batch();

    const senderRef = database.collection("users").doc(senderId);
    batch.update(senderRef, { swap_sent_to_id: null });

    const recipientRef = database.collection("users").doc(recipientId);
    batch.update(recipientRef, { swap_received_from_id: null });

    try {
      await batch.commit();
    } catch (error) {
      console.error(error);
    }
  }, [senderId, recipientId]);

  return swapCancel;
};

export default useSwapCancel;

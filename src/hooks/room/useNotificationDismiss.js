import { useCallback } from "react";

import { database } from "../../config/firebase";

const useNotificationDismiss = (notificationId, userId) => {
  const notificationDismiss = useCallback(async () => {
    const ref = database
      .collection("notifications")
      .doc(userId)
      .collection("denials")
      .doc(notificationId);

    try {
      await ref.delete();
    } catch (error) {
      console.error(error);
    }
  }, [notificationId, userId]);

  return notificationDismiss;
};

export default useNotificationDismiss;

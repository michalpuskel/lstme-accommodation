import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import notificationListReducer from "../reducers/dataListReducer";

const useNotifications = userId => {
  const [notificationList, dispatch] = useReducer(notificationListReducer, {});

  const changeHandler = useCallback(
    notificationChange => {
      dispatch({
        type: notificationChange.type,
        data: notificationChange.doc.data()
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const ref = database
      .collection("notifications")
      .doc(userId)
      .collection("denials")
      .orderBy("timestamp");
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(changeHandler);
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
    };
  }, [changeHandler, userId]);

  return notificationList;
};

export default useNotifications;

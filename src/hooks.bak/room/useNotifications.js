import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import reducer from "../_reducers/reducer";

const useNotifications = userId => {
  const [notificationList, dispatch] = useReducer(reducer, {});

  const changeHandler = useCallback(change => {
    const data = change.doc.data();
    dispatch({
      type: change.type,
      id: data.uid,
      data
    });
  }, []);

  useEffect(() => {
    if (!userId) return;

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
      // dispatch({ type: "reset" });
    };
  }, [changeHandler, userId]);

  return notificationList;
};

export default useNotifications;

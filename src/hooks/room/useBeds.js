import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import bedListReducer from "../reducers/listReducer";

const useBeds = roomId => {
  const [bedList, dispatch] = useReducer(bedListReducer, {});

  const changeHandler = useCallback(
    bedChange => {
      dispatch({
        type: bedChange.type,
        data: bedChange.doc.data()
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const ref = database
      .collection("rooms")
      .doc(roomId)
      .collection("beds")
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
  }, [changeHandler, roomId]);

  return bedList;
};

export default useBeds;

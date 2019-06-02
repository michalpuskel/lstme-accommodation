import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import reducer from "../_reducers/reducer";

const useBeds = roomId => {
  const [bedList, dispatch] = useReducer(reducer, {});

  const changeHandler = useCallback(change => {
    const id = change.doc.id;
    dispatch({
      type: change.type,
      id,
      data: id
    });
  }, []);

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
      dispatch({ type: "reset" });
    };
  }, [changeHandler, roomId]);

  return bedList;
};

export default useBeds;

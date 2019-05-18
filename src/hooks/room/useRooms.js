import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import roomListReducer from "../reducers/listReducer";

const useRooms = () => {
  const [roomList, dispatch] = useReducer(roomListReducer, {});

  const changeHandler = useCallback(
    roomChange => {
      dispatch({
        type: roomChange.type,
        data: roomChange.doc.data()
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const ref = database.collection("rooms").orderBy("timestamp");
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        snapshot.docChanges().forEach(changeHandler);
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
    };
  }, [changeHandler]);

  return roomList;
};

export default useRooms;

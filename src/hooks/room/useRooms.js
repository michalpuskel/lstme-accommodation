import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import roomListReducer from "../reducers/dataListReducer";
import useUnbreakableSpaces from "../utils/useUnbreakableSpaces";

const useRooms = () => {
  const [roomList, dispatch] = useReducer(roomListReducer, {});
  const glueFormat = useUnbreakableSpaces();

  const changeHandler = useCallback(
    roomChange => {
      const data = roomChange.doc.data();
      data.name = glueFormat(data.name);

      dispatch({
        type: roomChange.type,
        data
      });
    },
    [dispatch, glueFormat]
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
      dispatch({ type: "reset" });
    };
  }, [changeHandler]);

  return roomList;
};

export default useRooms;

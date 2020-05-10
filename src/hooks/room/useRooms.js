import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import reducer from "../_reducers/reducer";
import useUnbreakableSpaces from "../utils/useUnbreakableSpaces";

const useRooms = () => {
  const [roomList, dispatch] = useReducer(reducer, {});
  const glueFormat = useUnbreakableSpaces();

  const changeHandler = useCallback(
    (change) => {
      const data = change.doc.data();
      data.name = glueFormat(data.name);
      dispatch({
        type: change.type,
        id: data.uid,
        data,
      });
    },
    [glueFormat]
  );

  useEffect(() => {
    const ref = database.collection("rooms").orderBy("timestamp");
    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        snapshot.docChanges().forEach(changeHandler);
      },
      (error) => console.error(error)
    );

    return () => {
      unsubscribe();
      dispatch({ type: "reset" });
    };
  }, [changeHandler]);

  return roomList;
};

export default useRooms;

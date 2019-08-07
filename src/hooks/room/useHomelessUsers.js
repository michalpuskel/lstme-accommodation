import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import reducer from "../_reducers/reducer";

const useHomelessUsers = (roomIsSupervisorOnly, setUserId) => {
  const [userList, dispatch] = useReducer(reducer, {});

  const changeHandler = useCallback(change => {
    const data = change.doc.data();
    dispatch({
      type: change.type,
      id: data.uid,
      data
    });
  }, []);

  useEffect(() => {
    const ref = database
      .collection("users")
      .where("room_id", "==", null)
      .where("is_supervisor", "==", roomIsSupervisorOnly)
      .orderBy("last_name")
      .orderBy("first_name");
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        setUserId(undefined);
        snapshot.docChanges().forEach(changeHandler);
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
      dispatch({ type: "reset" });
    };
  }, [changeHandler, roomIsSupervisorOnly, setUserId]);

  return userList;
};

export default useHomelessUsers;

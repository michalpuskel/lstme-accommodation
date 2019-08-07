import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import reducer from "../_reducers/reducer";

const useUsers = () => {
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
      .orderBy("is_supervisor", "desc")
      .orderBy("is_super_admin", "desc")
      .orderBy("last_name")
      .orderBy("first_name");
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

  return userList;
};

export default useUsers;

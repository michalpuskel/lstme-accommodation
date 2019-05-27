import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import userListReducer from "../reducers/dataListReducer";

const useUsers = () => {
  const [userList, dispatch] = useReducer(userListReducer, {});

  const changeHandler = useCallback(
    userChange => {
      dispatch({
        type: userChange.type,
        data: userChange.doc.data()
      });
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch({ type: "reset" });

    const ref = database
      .collection("users")
      .orderBy("is_supervisor", "desc")
      .orderBy("is_super_admin", "desc")
      .orderBy("last_name");
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

  return userList;
};

export default useUsers;

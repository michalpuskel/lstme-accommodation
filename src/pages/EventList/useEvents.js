import { useReducer, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import reducer from "../../hooks/_reducers/reducer";

const useEvents = () => {
  const [eventList, dispatch] = useReducer(reducer, {});

  const changeHandler = useCallback((change) => {
    const data = change.doc.data();
    dispatch({
      type: change.type,
      id: data.uid,
      data,
    });
  }, []);

  useEffect(() => {
    const ref = database.collection("events").orderBy("timestamp", "desc");
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

  return eventList;
};

export default useEvents;

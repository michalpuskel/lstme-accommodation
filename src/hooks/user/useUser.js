import { useState, useEffect } from "react";

import { database } from "../../config/firebase";

const useUser = userId => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    birth_date: 0,
    swap_received_from_id: null,
    swap_sent_to_id: null
  });

  useEffect(() => {
    const ref = database.collection("users").doc(userId);
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        setUser(snapshot.data());
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

  return user;
};

export default useUser;

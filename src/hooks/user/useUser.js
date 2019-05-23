import { useState, useEffect } from "react";

import { database } from "../../config/firebase";

const useUser = userId => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    birth_date: 0,
    swap_received_from_id: null,
    swap_sent_to_id: null,
    room_id: null
  });

  useEffect(() => {
    if (userId === null) {
      setUser(null);
    } else {
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
    }
  }, [user, userId]);

  return user;
};

export default useUser;

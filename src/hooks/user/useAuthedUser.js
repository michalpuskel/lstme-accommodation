import { useState, useEffect } from "react";

import { auth, database } from "../../config/firebase";

const useAuthedUser = () => {
  const [authedUser, setAuthedUser] = useState(undefined);

  useEffect(() => {
    let unsubscribe = null;

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { uid } = currentUser;
        const ref = database.collection("users").doc(uid);
        unsubscribe = ref.onSnapshot(
          snapshot => {
            setAuthedUser({ ...snapshot.data() });
          },
          error => console.error(error)
        );
      } else {
        setAuthedUser(null);
      }
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return authedUser;
};

export default useAuthedUser;

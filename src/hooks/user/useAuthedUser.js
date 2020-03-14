import { useState, useEffect } from "react";

import { auth, database } from "../../config/firebase";

const useAuthedUser = setBan => {
  const [authedUser, setAuthedUser] = useState(undefined);

  useEffect(() => {
    let unsubscribe = null;

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { uid } = currentUser;
        const ref = database.collection("users").doc(uid);
        unsubscribe = ref.onSnapshot(
          snapshot => {
            if (snapshot.exists) {
              setAuthedUser({ ...snapshot.data() });
            } else {
              setAuthedUser(null);
              setBan(true);
            }
          },
          error => console.error(error)
        );
      } else {
        setAuthedUser(null);
        setBan(false);
      }
    });

    return () => {
      unsubscribe && unsubscribe();
      setAuthedUser(undefined);
      setBan(false);
    };
  }, [setBan]);

  return authedUser;
};

export default useAuthedUser;

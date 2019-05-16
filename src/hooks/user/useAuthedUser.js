import { useState, useEffect } from "react";

import { auth, database } from "../../config/firebase";

const useAuthedUser = () => {
  const [authedUser, setAuthedUser] = useState(undefined);

  useEffect(() => {
    let unsubscribeFromAuthedUser = null;

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { uid } = currentUser;
        const userDocRef = database.collection("users").doc(uid);
        unsubscribeFromAuthedUser = userDocRef.onSnapshot(
          userDocSnapshot => {
            setAuthedUser({ ...userDocSnapshot.data() });
          },
          err => {
            console.info("error", err);
          }
        );
      } else {
        setAuthedUser(null);
      }
    });

    return () => {
      unsubscribeFromAuthedUser && unsubscribeFromAuthedUser();
    };
  }, []);

  return authedUser;
};

export default useAuthedUser;

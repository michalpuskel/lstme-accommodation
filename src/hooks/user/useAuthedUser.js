import { useState, useEffect } from "react";

import { auth, database } from "../../config/firebase";

const useAuthedUser = () => {
  const [authedUser, setAuthedUser] = useState(undefined);

  useEffect(() => {
    let unsubscribeFromAuthedUser = null;

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { uid, email } = currentUser;

        const userDocRef = database.collection("users").doc(uid);
        unsubscribeFromAuthedUser = userDocRef.onSnapshot(
          userDocSnapshot => {
            const userDocData = userDocSnapshot.data();
            setAuthedUser({ uid, email, ...userDocData });
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

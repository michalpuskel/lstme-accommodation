import { useState, useEffect } from "react";

import { auth } from "./firebase";
import { loadUserWithId } from "./backend";

const useUserContext = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromUser = null;
    auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const { uid, email } = currentUser;
        unsubscribeFromUser = loadUserWithId({ uid, email, setUser });
      }
    });

    return () => {
      unsubscribeFromUser();
    };
  }, []);

  return { user, setUser };
};

export default useUserContext;

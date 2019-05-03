import { useState, useEffect } from "react";

import { auth } from "./firebase";
import loadUser from "./backend";

const useUserContext = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromUser = null;
    auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const { uid, email } = currentUser;
        unsubscribeFromUser = loadUser({ uid, email, setUser });
      }
    });

    return () => {
      unsubscribeFromUser();
    };
  }, []);

  return { user, setUser };
};

export default useUserContext;

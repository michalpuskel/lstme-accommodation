import { useState, useEffect } from "react";

import { auth } from "./firebase";
import loadUser from "./backend";

const useUserContext = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(async currentUser => {
      if (currentUser) {
        const { uid, email } = currentUser;
        let user = { uid, email };

        try {
          user = await loadUser(user);
        } catch (err) {
          console.info("error", err);
        }

        setUser(user);
      }
    });
  }, []);

  return { user, setUser };
};

export default useUserContext;

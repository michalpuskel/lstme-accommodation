import { useCallback } from "react";

import { auth } from "../../config/firebase";

const useLogOut = () => {
  const logOut = useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return logOut;
};

export default useLogOut;

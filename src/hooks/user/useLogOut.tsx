import { useCallback } from "react";

import { auth } from "../../config/firebase";

const useLogOut = () =>
  useCallback(async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

export default useLogOut;

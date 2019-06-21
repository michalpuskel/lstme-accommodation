import { useCallback } from "react";

import { auth } from "../../config/firebase";

const useLogOut = (): CallableFunction =>
  useCallback(async (): Promise<void> => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

export default useLogOut;

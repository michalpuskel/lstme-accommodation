import { useCallback, MouseEvent } from "react";
import { auth } from "../../config/firebase";

const useLogOut = (): ((event: MouseEvent<HTMLButtonElement>) => void) =>
  useCallback(async (): Promise<void> => {
    try {
      await auth.signOut();
    } catch (error) {
      console.error(error);
    }
  }, []);

export default useLogOut;

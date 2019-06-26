import { useCallback, MouseEvent } from "react";

import { IFormAuthState } from "../../@types/auth";
import { auth } from "../../config/firebase";

const useSubmitLoginHandler = (
  formAuth: IFormAuthState
): ((event: MouseEvent<HTMLButtonElement>) => void) =>
  useCallback(
    async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
      event.preventDefault();

      try {
        await auth.signInWithEmailAndPassword(
          formAuth.fields.email,
          formAuth.fields.password
        );
      } catch (error) {
        console.error(error);
      }
    },
    [formAuth.fields.email, formAuth.fields.password]
  );

export default useSubmitLoginHandler;

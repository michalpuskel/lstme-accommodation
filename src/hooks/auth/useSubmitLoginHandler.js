import { useCallback } from "react";

import { auth } from "../../config/firebase";

const useSubmitLoginHandler = (formBasic, setError) => {
  const submitLoginHandler = useCallback(
    async event => {
      event.preventDefault();

      try {
        await auth.signInWithEmailAndPassword(
          formBasic.emailInput,
          formBasic.passwordInput
        );
      } catch (error) {
        console.error(error);
        setError({ code: error.code });
      }
    },
    [formBasic.emailInput, formBasic.passwordInput, setError]
    //TODO question: is it worth to memoize? callback will update quite often on every input change...
  );

  return submitLoginHandler;
};

export default useSubmitLoginHandler;

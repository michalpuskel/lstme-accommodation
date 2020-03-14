import { useCallback, useContext } from "react";
import BanContext from "../../config/BanContext";
import { auth } from "../../config/firebase";

const useSubmitLoginHandler = (formBasic, setError) => {
  const { ban } = useContext(BanContext);

  const submitLoginHandler = useCallback(
    async event => {
      event.preventDefault();

      try {
        if (ban) {
          await auth.signOut();
        }

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

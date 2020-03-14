import { useCallback, useContext, useState } from "react";
import BanContext from "../../config/BanContext";
import { auth } from "../../config/firebase";

const useSubmitLoginHandler = (formBasic, setError) => {
  const { ban } = useContext(BanContext);
  const [loading, setLoading] = useState(false);

  const submitLoginHandler = useCallback(
    async event => {
      setLoading(true);
      event.preventDefault();

      try {
        if (ban) {
          await auth.signOut();
        }

        await auth.signInWithEmailAndPassword(
          formBasic.emailInput,
          formBasic.passwordInput
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError({ code: error.code });
        setLoading(false);
      }
    },
    [formBasic.emailInput, formBasic.passwordInput, setError]
    //TODO question: is it worth to memoize? callback will update quite often on every input change...
  );

  return { submitLoginHandler, loading };
};

export default useSubmitLoginHandler;

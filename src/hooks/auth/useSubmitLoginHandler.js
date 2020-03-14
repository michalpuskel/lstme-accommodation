import { useCallback, useState } from "react";
// import BanContext from "../../config/BanContext";
import { auth } from "../../config/firebase";
// import UserContext from "../../config/UserContext";

const useSubmitLoginHandler = (formBasic, setError) => {
  // const { ban, setBan } = useContext(BanContext);
  const [loading, setLoading] = useState(false);

  // const authedUser = useContext(UserContext);

  const submitLoginHandler = useCallback(
    async event => {
      setLoading(true);
      event.preventDefault();

      try {
        // if (ban) {
        await auth.signOut();
        // }

        console.log("SIGNing IN");

        await auth.signInWithEmailAndPassword(
          formBasic.emailInput,
          formBasic.passwordInput
        );

        console.log("signed with", {
          email: formBasic.emailInput,
          pwd: formBasic.passwordInput
        });

        // console.log({ authedUser });

        // if (!authedUser) {
        //   setBan(true);
        //   console.warn(
        //     "setting ban manually because auth.onAuthStateChanged is shitty"
        //   );
        // }
      } catch (error) {
        console.error(error);
        setError({ code: error.code });
        setLoading(false);
      }

      setLoading(false);
    },
    [formBasic.emailInput, formBasic.passwordInput, setError]
    //TODO question: is it worth to memoize? callback will update quite often on every input change...
  );

  return { submitLoginHandler, loading };
};

export default useSubmitLoginHandler;

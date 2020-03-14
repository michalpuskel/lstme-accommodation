import { useCallback, useState } from "react";

import { auth, database } from "../../config/firebase";

const useSubmitRegistrationHandler = ({
  formBasic,
  formRegistration,
  setError
}) => {
  const [loading, setLoading] = useState(false);

  const submitRegistrationHandler = useCallback(
    async event => {
      setLoading(true);
      event.preventDefault();

      //TODO transaction begin
      let newUser = null;
      try {
        const createdUserAuthData = await auth.createUserWithEmailAndPassword(
          formBasic.emailInput,
          formBasic.passwordInput
        );
        const { uid, email } = createdUserAuthData.user;
        newUser = { uid, email };
      } catch (error) {
        console.error(error);
        setError({ code: error.code });
        setLoading(false);
      }

      if (newUser) {
        const ref = database.collection("users").doc(newUser.uid);
        try {
          await ref.set({
            uid: newUser.uid,
            email: newUser.email,
            first_name: formRegistration.firstNameInput,
            last_name: formRegistration.lastNameInput,
            birth_date: formRegistration.birthDateInput,
            is_supervisor: false,
            is_super_admin: false,
            room_id: null,
            swap_sent_to_id: null,
            swap_received_from_id: null
          });
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
      //TODO transaction end

      setLoading(false);
    },
    [
      formBasic.emailInput,
      formBasic.passwordInput,
      formRegistration.birthDateInput,
      formRegistration.firstNameInput,
      formRegistration.lastNameInput,
      setError
    ]
    //TODO question: is it worth to memoize? callback will update quite often on every input change...
  );

  return { submitRegistrationHandler, loading };
};

export default useSubmitRegistrationHandler;

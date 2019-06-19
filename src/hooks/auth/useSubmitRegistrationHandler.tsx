import { useCallback } from "react";

import { IFormLogin, IFormRegistration } from "../../@types/interfaces";
import { auth, database } from "../../config/firebase";

const useSubmitRegistrationHandler = (
  formLogin: IFormLogin,
  formRegistration: IFormRegistration
) =>
  useCallback(async event => {
    event.preventDefault();

    try {
      const createdUserAuthData = await auth.createUserWithEmailAndPassword(
        formLogin.email.input,
        formLogin.password.input
      );

      if (createdUserAuthData.user) {
        const { uid, email } = createdUserAuthData.user;
        const ref = database.collection("users").doc(uid);

        await ref.set({
          uid,
          email,
          first_name: formRegistration.firstName.input,
          last_name: formRegistration.lastName.input,
          birth_date: formRegistration.birthDate.input,
          is_supervisor: false,
          is_super_admin: false,
          room_id: null,
          swap_sent_to_id: null,
          swap_received_from_id: null
        });
      }
    } catch (error) {
      console.error(error);
    }
  }, []); // TODO INPUTS

export default useSubmitRegistrationHandler;

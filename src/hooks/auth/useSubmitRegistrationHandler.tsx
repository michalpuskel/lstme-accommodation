import { useCallback, MouseEvent } from "react";

import { IUser } from "../../@types";
import { IFormAuthState } from "../../@types/auth";

import { auth, database } from "../../config/firebase";

const useSubmitRegistrationHandler = (
  formAuth: IFormAuthState
): ((event: MouseEvent<HTMLButtonElement>) => void) =>
  useCallback(
    async (event: MouseEvent<HTMLButtonElement>): Promise<void> => {
      event.preventDefault();

      try {
        const createdUserAuthData = await auth.createUserWithEmailAndPassword(
          formAuth.fields.email,
          formAuth.fields.password
        );

        if (createdUserAuthData.user) {
          const { uid, email } = createdUserAuthData.user;
          const ref = database.collection("users").doc(uid);

          /* eslint-disable @typescript-eslint/camelcase */
          const newUser: IUser = {
            uid,
            email: email as string,
            first_name: formAuth.fields.firstName,
            last_name: formAuth.fields.lastName,
            birth_date: formAuth.fields.birthDate,
            is_supervisor: false,
            is_super_admin: false,
            room_id: null,
            swap_sent_to_id: null,
            swap_received_from_id: null
          };
          /* eslint-enable @typescript-eslint/camelcase */
          await ref.set(newUser);
        }
      } catch (error) {
        console.error(error);
      }
    },
    [
      formAuth.fields.birthDate,
      formAuth.fields.email,
      formAuth.fields.firstName,
      formAuth.fields.lastName,
      formAuth.fields.password
    ]
  );

export default useSubmitRegistrationHandler;

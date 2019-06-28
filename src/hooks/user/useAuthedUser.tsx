import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { User } from "firebase";

import { auth, database } from "../../config/firebase";
import { IUser, IError } from "../../@types";

const useAuthedUser = (
  pushError: Dispatch<SetStateAction<IError[]>>
): IUser | null | undefined => {
  const [authedUser, setAuthedUser] = useState<IUser | null | undefined>(
    undefined
  );

  useEffect((): void | (() => void) => {
    let unsubscribe: (() => void) | null = null;

    auth.onAuthStateChanged((currentUser: User | null): void => {
      if (currentUser) {
        const { uid } = currentUser;
        const ref = database.collection("users").doc(uid);

        unsubscribe = ref.onSnapshot(
          // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
          async snapshot => {
            const data = snapshot.data() as IUser | undefined;

            if (data) {
              setAuthedUser(data);
            } else {
              try {
                await auth.signOut();
              } catch (error) {
                console.error(error);
              }

              pushError(buffer =>
                buffer.concat({
                  code: "user-ban"
                })
              );
              setAuthedUser(null); // TODO set after user interaction ?
            }
          },
          (error: Error): void => console.error(error)
        );
      } else {
        setAuthedUser(null);
      }
    });

    return (): void => {
      unsubscribe && unsubscribe();
    };
  }, [pushError]);

  return authedUser;
};

export default useAuthedUser;

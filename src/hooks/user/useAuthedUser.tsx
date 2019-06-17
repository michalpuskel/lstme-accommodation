import { useState, useEffect } from "react";

import { auth, database } from "../../config/firebase";
import { IUser, IError } from "../../@types/interfaces";

const useAuthedUser = (pushError: any) => {
  const [authedUser, setAuthedUser] = useState<IUser | null | undefined>(
    undefined
  );

  useEffect(() => {
    let unsubscribe: any = null;

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        const { uid } = currentUser;
        const ref = database.collection("users").doc(uid);

        unsubscribe = ref.onSnapshot(
          async snapshot => {
            const data = snapshot.data() as IUser;

            if (data === undefined) {
              try {
                await auth.signOut();
              } catch (error) {
                console.error(error);
              }

              pushError((buffer: IError[]) => {
                buffer.concat({
                  code: "user-ban"
                });
              });
              setAuthedUser(null);
            } else {
              setAuthedUser(data);
            }
          },
          error => console.error(error)
        );
      } else {
        setAuthedUser(null);
      }
    });

    return () => {
      unsubscribe && unsubscribe();
    };
  }, [pushError]);

  return authedUser;
};

export default useAuthedUser;

import { useState, useEffect } from "react";

import { auth, database } from "../../config/firebase";

const useAuthedUser = setBan => {
  const [authedUser, setAuthedUser] = useState(undefined);

  useEffect(() => {
    let unsubscribe = null;

    auth.onAuthStateChanged(currentUser => {
      console.log("firebase user", currentUser && currentUser.email);

      if (currentUser) {
        const { uid } = currentUser;
        const ref = database.collection("users").doc(uid);
        unsubscribe = ref.onSnapshot(
          snapshot => {
            console.log({ snapshot });

            if (snapshot.exists) {
              setAuthedUser({ ...snapshot.data() });
            } else {
              console.error(
                `In case you got error message 'Váš účet bol zablokovaný. Pre viac informácií kontaktujte administrátora, prosím.'
that's actually the only good case when this piece of code and log message should have happened.
In that specific case there is no need to read further this comment.



Otherwise:
I hate this stupid shitty firebase from stupid Google and I will never ever use it again.
In case something weird just happend in app, that's because of auth.onAuthStateChanged 
from firebase 'auth' super shitty module was fired with no reason just like that, even actually you have not logged out... have you ?!
and this causes many weird problems... most probably you have triggered firebase shitty dark magic by testing multiple users in 1 browser.
REFRESH your browser, please, and everything will work again. When not switching multiple accounts in 1 browser 
(i.e. in hypothetical production use, which will never happen btw. because of firebase shitty security rules 
and transactions and DB joins 'support'...) this weird known bug should never happen.`
              );
              setAuthedUser(null);
              setBan(true);
            }
          },
          error => console.error(error)
        );
      } else {
        setAuthedUser(null);
        setBan(false);
      }
    });

    return () => {
      setAuthedUser(undefined);
      setBan(false);
      unsubscribe && unsubscribe();
    };
  }, [setBan]);

  return authedUser;
};

export default useAuthedUser;

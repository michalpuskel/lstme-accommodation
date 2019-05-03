import { database } from "./firebase";

const loadUser = async ({ uid, email, setUser }) => {
  const userDocRef = database.collection("users").doc(uid);
  const unsubscribe = userDocRef.onSnapshot(
    userDocSnapshot => {
      const userDocData = userDocSnapshot.data();
      setUser({ uid, email, ...userDocData });
    },
    err => {
      console.info("error", err);
    }
  );

  return unsubscribe;
};

export default loadUser;

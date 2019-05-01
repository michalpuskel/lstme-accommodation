import { database } from "./firebase";

const loadUser = async ({ uid, email }) => {
  try {
    const userDocRef = database.collection("users").doc(uid);
    const userDoc = await userDocRef.get();
    if (userDoc.exists) {
      const userDocData = userDoc.data();

      return { uid, email, ...userDocData };
    } else {
      console.info(`error: No document for user: ${{ uid, email }}`);
    }
  } catch (err) {
    console.info("error", err);
  }
};

export default loadUser;

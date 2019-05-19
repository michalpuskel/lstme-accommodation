import { database } from "./firebase";

const loadUserWithId = ({ uid, email, setUser }) => {
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


const loadBed = ({ userId, setBed }) => {
  const userDocRef = database.collection("users").doc(userId);
  const unsubscribe = userDocRef.onSnapshot(
    userDocSnapshot => {
      const { first_name, last_name, birth_date } = userDocSnapshot.data();
      setBed({ first_name, last_name, birth_date });
    },
    err => {
      console.info("error", err);
    }
  );
  return unsubscribe;
};





const updateDocumentProperty = async ({
  uid: { collection, document },
  property,
  value
}) => {
  const docRef = database.collection(collection).doc(document);
  try {
    await docRef.update({
      [property]: value
    });
  } catch (err) {
    console.info("error", err);
  }
};

export {
  loadUserWithId,
  loadBed,
  updateDocumentProperty
};

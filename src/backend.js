import { database } from "./firebase";

const createUserWithId = async ({ uid, first_name, last_name, birth_date }) => {
  const newUserDocRef = database.collection("users").doc(uid);
  try {
    await newUserDocRef.set({
      first_name,
      last_name,
      birth_date,
      is_supervisor: false,
      is_super_admin: false,
      room_id: null,
      swap_user_id: null
    });
  } catch (err) {
    console.info("error", err);
  }
};

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

const loadRoomList = ({ setRoomList }) => {
  const roomListRef = database.collection("room_list");
  const unsubscribe = roomListRef.onSnapshot(
    roomListSnapshot => {
      let roomList = [];
      roomListSnapshot.forEach(roomDoc => {
        roomList.push(roomDoc.id);
      });
      setRoomList(roomList);
    },
    err => {
      console.info("error", err);
    }
  );
  return unsubscribe;
};

const loadRoomWithId = ({ uid, setRoom }) => {
  const roomDocRef = database.collection("rooms").doc(uid);
  const unsubscribe = roomDocRef.onSnapshot(
    roomDocSnapshot => {
      const roomDocData = roomDocSnapshot.data();
      setRoom(roomDocData);
    },
    err => {
      console.info("error", err);
    }
  );
  return unsubscribe;
};

const loadBedList = ({ roomId, setBedList }) => {
  const bedListRef = database
    .collection("rooms")
    .doc(roomId)
    .collection("bed_list");
  const unsubscribe = bedListRef.onSnapshot(
    bedListSnapshot => {
      let bedList = [];
      //todo
      console.log(bedListSnapshot.docChanges());
      //todo
      bedListSnapshot.forEach(bedDoc => {
        bedList.push(bedDoc.id);
      });
      setBedList(bedList);
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

const addUserToBedList = async ({ roomId, userId }) => {
  const bedRef = database
    .collection("rooms")
    .doc(roomId)
    .collection("bed_list")
    .doc(userId);
  try {
    await bedRef.set({});
  } catch (err) {
    console.info("error", err);
  }
};

const deleteUserFromBedList = async ({ roomId, userId }) => {
  const bedRef = database
    .collection("rooms")
    .doc(roomId)
    .collection("bed_list")
    .doc(userId);
  try {
    await bedRef.delete();
  } catch (err) {
    console.info("error", err);
  }
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
  createUserWithId,
  loadUserWithId,
  loadRoomList,
  loadRoomWithId,
  loadBedList,
  loadBed,
  addUserToBedList,
  deleteUserFromBedList,
  updateDocumentProperty
};

import { useCallback } from "react";

import { auth, database } from "../../config/firebase";
// import { adminAuth } from "../../config/firebaseAdmin";

const useUserDelete = userId => {
  const userDelete = useCallback(async () => {
    const userRef = database.collection("users").doc(userId);

    try {
      //TODO transaction begin
      await database.runTransaction(async transaction => {
        const userDoc = await transaction.get(userRef);
        const { room_id } = userDoc.data();
        if (room_id) {
          const bedRef = database
            .collection("rooms")
            .doc(room_id)
            .collection("beds")
            .doc(userId);
          transaction.delete(bedRef);
        }
        transaction.delete(userRef);
      });

      await auth.currentUser.delete();
      // TODO delete any user
      // await adminAuth.deleteUser(userId);

      //TODO transaction end
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  return userDelete;
};

export default useUserDelete;

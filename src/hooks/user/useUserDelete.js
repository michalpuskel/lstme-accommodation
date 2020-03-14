import { useCallback } from "react";

import { auth, database } from "../../config/firebase";

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

      if (auth.currentUser.uid === userId) {
        await auth.currentUser.delete();
      } else {
        const ref = database.collection("users").doc(userId);
        try {
          await ref.delete();
        } catch (error) {
          console.error(error);
        }
      }

      //TODO transaction end
    } catch (error) {
      console.error(error);
    }
  }, [userId]);

  return userDelete;
};

export default useUserDelete;

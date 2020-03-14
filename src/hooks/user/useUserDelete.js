import { useCallback } from "react";

import { auth, database } from "../../config/firebase";

const useUserDelete = () => {
  const userDelete = useCallback(async userId => {
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
        console.log("me user delete");
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
  }, []);

  return userDelete;
};

export default useUserDelete;

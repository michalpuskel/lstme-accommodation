import { useCallback, useContext } from "react";

import { auth, database } from "../../config/firebase";
import UserContext from "../../config/UserContext";

const useUserDelete = () => {
  const currentUser = useContext(UserContext);

  const userDelete = useCallback(
    async (userId) => {
      const userRef = database.collection("users").doc(userId);

      try {
        //TODO transaction begin
        await database.runTransaction(async (transaction) => {
          const userDoc = await transaction.get(userRef);

          const { room_id, event_id } = userDoc.data();
          if (currentUser.event_id !== event_id) {
            throw new Error("delete-other-event-user");
          }

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

          await ref.delete();
        }

        //TODO transaction end
      } catch (error) {
        if (error.message === "delete-other-event-user") {
          console.log(
            "Attempt for 'Deleting user from other event' was skipped",
            `user id: ${userId}`
          );
        } else {
          console.error(error);
        }
      }
    },
    [currentUser.event_id]
  );

  return userDelete;
};

export default useUserDelete;

import { useContext, useCallback } from "react";

import UserContext from "../../config/UserContext";
import { database } from "../../config/firebase";

const useChangeSupervisorOnlyHandler = roomId => {
  const user = useContext(UserContext);

  const changeSupervisorOnlyHandler = useCallback(
    async event => {
      if (!user.is_supervisor) return;

      const ref = database.collection("rooms").doc(roomId);
      try {
        await ref.update({ is_supervisor_only: event.target.checked });
      } catch (error) {
        console.error(error);
      }
    },
    [roomId, user.is_supervisor]
  );

  return changeSupervisorOnlyHandler;
};

export default useChangeSupervisorOnlyHandler;

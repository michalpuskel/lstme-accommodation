import { useCallback } from "react";

import { database } from "../../config/firebase";

const useChangeIsSupervisorHandler = userId => {
  const changeIsSupervisorHandler = useCallback(
    async event => {
      const ref = database.collection("users").doc(userId);
      try {
        await ref.update({ is_supervisor: event.target.checked });
      } catch (error) {
        console.error(error);
      }
    },
    [userId]
  );

  return changeIsSupervisorHandler;
};

export default useChangeIsSupervisorHandler;

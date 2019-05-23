import { useCallback } from "react";

import { database } from "../../config/firebase";

const useChangeIsSuperAdminHandler = userId => {
  const changeIsSuperAdminHandler = useCallback(
    async event => {
      const ref = database.collection("users").doc(userId);
      try {
        await ref.update({ is_super_admin: event.target.checked });
      } catch (error) {
        console.error(error);
      }
    },
    [userId]
  );

  return changeIsSuperAdminHandler;
};

export default useChangeIsSuperAdminHandler;

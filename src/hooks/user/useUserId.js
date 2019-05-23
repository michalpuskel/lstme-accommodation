import { useCallback } from "react";

const useUserId = user => {
  const userId = useCallback(() => user && user.uid, [user]);

  return userId;
};

export default useUserId;

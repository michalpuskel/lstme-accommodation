import { useCallback } from "react";

const useUserInfo = user => {
  const uid = useCallback(() => user && user.uid, [user]);
  const first_name = useCallback(() => (user ? user.first_name : ""), [user]);
  const last_name = useCallback(() => (user ? user.last_name : ""), [user]);

  return { uid, first_name, last_name };
};

export default useUserInfo;

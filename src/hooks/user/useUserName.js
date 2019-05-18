import { useCallback } from "react";

const useUserName = () => {
  const getUserName = useCallback(
    user => `${user.first_name} ${user.last_name}`,
    []
  );

  return getUserName;
};

export default useUserName;

import { useCallback } from "react";

const useIsMySwapper = () => {
  const isMySwapper = useCallback(
    (user, authedUser) =>
      user.swap_received_from_id === authedUser.uid ||
      user.swap_sent_to_id === authedUser.uid,
    []
  );

  return isMySwapper;
};

export default useIsMySwapper;

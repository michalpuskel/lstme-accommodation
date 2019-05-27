import { useCallback } from "react";

const useIsSwapReady = () => {
  const isSwapReady = useCallback(
    (user, authedUser) =>
      user.swap_received_from_id === null &&
      user.swap_sent_to_id === null &&
      authedUser.swap_received_from_id === null &&
      authedUser.swap_sent_to_id === null &&
      user.room_id !== null &&
      authedUser.room_id !== null,
    []
  );

  return isSwapReady;
};

export default useIsSwapReady;

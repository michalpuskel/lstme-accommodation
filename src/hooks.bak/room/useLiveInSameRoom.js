import { useCallback } from "react";

const useLiveInSameRoom = () => {
  const liveInSameRoom = useCallback(
    (user, authedUser) => user.room_id === authedUser.room_id,
    []
  );

  return liveInSameRoom;
};

export default useLiveInSameRoom;

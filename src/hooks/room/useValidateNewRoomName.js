import { useCallback } from "react";

const useValidateNewRoomName = roomName => {
  const valid = useCallback(() => roomName.length > 0, [roomName.length]);

  return valid;
};

export default useValidateNewRoomName;

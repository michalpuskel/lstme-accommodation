import { useCallback } from "react";

import useRoom from "./useRoom";

const useRoomName = user => {
  const roomId = user && user.room_id;
  const room = useRoom(roomId);

  const roomName = useCallback(() => (room ? room.name : ""), [room]);

  return roomName;
};

export default useRoomName;

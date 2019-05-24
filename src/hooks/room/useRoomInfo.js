import { useCallback } from "react";

import useRoom from "./useRoom";

const useRoomInfo = user => {
  const roomId = user && user.room_id;
  const room = useRoom(roomId);

  const name = useCallback(() => (room ? room.name : ""), [room]);
  const uid = useCallback(() => (room ? room.uid : ""), [room]);

  return { name, uid };
};

export default useRoomInfo;

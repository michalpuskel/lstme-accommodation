import { useCallback } from "react";

import useRoom from "./useRoom";

const useRoomInfo = user => {
  const roomId = user && user.room_id;
  const room = useRoom(roomId);

  const uid = useCallback(() => room && room.uid, [room]);
  const name = useCallback(() => (room ? room.name : ""), [room]);

  return { uid, name };
};

export default useRoomInfo;

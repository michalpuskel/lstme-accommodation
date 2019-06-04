import { useState, useCallback } from "react";

const useRoomsDeleteAll = () => {
  //TODO transaction 'collection' read / delete
  const [deleteRooms, setDeleteRooms] = useState(false);

  const roomsDeleteAll = useCallback(() => {
    setDeleteRooms(true);
  }, []);

  const enableRoomsAdd = useCallback(() => {
    setDeleteRooms(false);
  }, []);

  return { deleteRooms, roomsDeleteAll, enableRoomsAdd };
};

export default useRoomsDeleteAll;

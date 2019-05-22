import { useState, useCallback } from "react";

const useRoomsDeleteAll = () => {
  //TODO transaction 'collection' read / delete
  const [deleteRooms, setDeleteRooms] = useState(false);

  const roomsDeleteAll = useCallback(() => {
    setDeleteRooms(true);
  }, []);

  return { deleteRooms, roomsDeleteAll };
};

export default useRoomsDeleteAll;

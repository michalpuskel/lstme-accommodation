import { useCallback } from "react";

import { database, dbDecrement } from "../../config/firebase";

const useBedDelete = (roomId, bedCount, bedListLength) => {
  const bedDelete = useCallback(async () => {
    const ref = database.collection("rooms").doc(roomId);

    try {
      await ref.update({
        bed_count: dbDecrement
      });
    } catch (error) {
      console.error(error);
    }
  }, [roomId]);

  return bedDelete;
};

export default useBedDelete;

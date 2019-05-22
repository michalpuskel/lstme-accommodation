import { useCallback } from "react";

import { database, dbIncrement } from "../../config/firebase";

const useBedAdd = roomId => {
  const bedAdd = useCallback(async () => {
    const ref = database.collection("rooms").doc(roomId);

    try {
      await ref.update({
        bed_count: dbIncrement
      });
    } catch (error) {
      console.error(error);
    }
  }, [roomId]);

  return bedAdd;
};

export default useBedAdd;

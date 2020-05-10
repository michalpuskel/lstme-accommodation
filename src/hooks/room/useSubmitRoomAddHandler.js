import { useCallback, useContext } from "react";

import { database, dbTimestamp } from "../../config/firebase";
import UserContext from "../../config/UserContext";

const useSubmitRoomAddHandler = (input, onRoomAdd) => {
  const user = useContext(UserContext);

  const submitRoomAddHandler = useCallback(
    async (event) => {
      event.preventDefault();
      onRoomAdd();

      const ref = database.collection("rooms").doc();
      try {
        await ref.set({
          uid: ref.id,
          name: input.name,
          bed_count: input.bedCount,
          is_supervisor_only: input.isSupervisorOnly,
          description: input.description,
          timestamp: dbTimestamp,
          event_id: user.event_id,
        });
      } catch (error) {
        console.error(error);
      }
    },
    [
      input.bedCount,
      input.description,
      input.isSupervisorOnly,
      input.name,
      onRoomAdd,
      user.event_id,
    ]
    //TODO question: is it worth to memoize? callback will update quite often on every input change...
  );

  return submitRoomAddHandler;
};

export default useSubmitRoomAddHandler;

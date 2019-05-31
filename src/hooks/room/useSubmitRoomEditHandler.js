import { useCallback } from "react";

import { database } from "../../config/firebase";

const useSubmitRoomEditHandler = (roomId, input) => {
  const submitRoomEditHandler = useCallback(
    async event => {
      event.preventDefault();

      const ref = database.collection("rooms").doc(roomId);
      try {
        await ref.update({
          name: input.name,
          description: input.description
        });
      } catch (error) {
        console.error(error);
      }
    },
    [input.description, input.name, roomId]
    //TODO question: is it worth to memoize? callback will update quite often on every input change...
  );

  return submitRoomEditHandler;
};

export default useSubmitRoomEditHandler;

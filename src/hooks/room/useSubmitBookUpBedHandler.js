import { useCallback } from "react";
import useReservationBookUp from "./useReservationBookUp";

const useSubmitBookUpBedHandler = (user, roomId, validBookUp) => {
  const reservationBookUp = useReservationBookUp(roomId);

  const submitBookUpBedHandler = useCallback(
    async event => {
      event.preventDefault();

      if (!validBookUp) {
        return;
      }

      try {
        await reservationBookUp(user && user.uid);
      } catch (error) {
        console.error(error);
      }
    },
    [reservationBookUp, user, validBookUp]
  );

  return submitBookUpBedHandler;
};

export default useSubmitBookUpBedHandler;

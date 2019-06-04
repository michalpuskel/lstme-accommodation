import { useContext, useCallback } from "react";

import UserContext from "../../config/UserContext";

const useBedEmpty = (roomIsSupervisorOnly, onReservationBookUp) => {
  const isAvailableBed = useCallback(
    user => user.is_supervisor || !roomIsSupervisorOnly,
    [roomIsSupervisorOnly]
  );

  const userIsAccommodated = useCallback(user => user.room_id !== null, []);

  const user = useContext(UserContext);

  const reservationBookUpHandler = useCallback(async () => {
    if (userIsAccommodated(user) || !isAvailableBed(user)) return;

    try {
      await onReservationBookUp(user.uid);
    } catch (error) {
      console.error(error);
    }
  }, [user, userIsAccommodated, isAvailableBed, onReservationBookUp]);

  return { user, isAvailableBed, userIsAccommodated, reservationBookUpHandler };
};

export default useBedEmpty;

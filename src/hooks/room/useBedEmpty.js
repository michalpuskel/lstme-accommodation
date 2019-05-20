import { useContext, usecallback } from "react";

import UserContext from "../../config/UserContext";

const useBedEmpty = (roomIsSupervisorOnly, onReservationBookUp) => {
  const isAvailableBed = usecallback(
    user => user.is_supervisor || !roomIsSupervisorOnly,
    [roomIsSupervisorOnly]
  );

  const userIsAccommodated = usecallback(user => user.room_id !== null, []);

  const user = useContext(UserContext);

  const reservationBookUpHandler = usecallback(async () => {
    if (userIsAccommodated(user) || !isAvailableBed(user)) return;

    try {
      await onReservationBookUp(user.uid);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  return { user, isAvailableBed, userIsAccommodated, reservationBookUpHandler };
};

export default useBedEmpty;

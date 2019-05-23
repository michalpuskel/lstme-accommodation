import { useCallback } from "react";

import useUser from "../../hooks/user/useUser";
import useIsMyRow from "../../hooks/user/useIsMyRow";

const useBed = (userId, onReservationCancel) => {
  const user = useUser(userId);

  const { isMyRow, authedUser } = useIsMyRow(userId);
  const isMyBed = isMyRow;

  const reservationCancelHandler = useCallback(async () => {
    if (!isMyBed()) return;

    try {
      await onReservationCancel(userId);
    } catch (error) {
      console.error(error);
    }
  }, [isMyBed, onReservationCancel, userId]);

  const reservationKickOutHandler = useCallback(async () => {
    try {
      await onReservationCancel(userId);
    } catch (error) {
      console.error(error);
    }
  }, [onReservationCancel, userId]);

  return {
    authedUser,
    user,
    isMyBed,
    reservationCancelHandler,
    reservationKickOutHandler
  };
};

export default useBed;

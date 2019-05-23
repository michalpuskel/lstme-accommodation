import { useState, useEffect, useCallback } from "react";

import { database } from "../../config/firebase";
import useIsMyRow from "../../hooks/user/useIsMyRow";

const useBed = (userId, onReservationCancel) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    birth_date: 0
  });

  useEffect(() => {
    const ref = database.collection("users").doc(userId);
    const unsubscribe = ref.onSnapshot(
      snapshot => {
        setUser(snapshot.data());
      },
      error => console.error(error)
    );

    return () => {
      unsubscribe();
    };
  }, [userId]);

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

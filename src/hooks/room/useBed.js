import { useState, useEffect, useContext, useCallback } from "react";

import UserContext from "../../config/UserContext";
import { database } from "../../config/firebase";

const useBed = (userId, onReservationCancel) => {
  const [user, setUser] = useState({});

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

  const authedUser = useContext(UserContext);

  const isMyBed = useCallback(() => userId === authedUser.uid, [
    userId,
    authedUser.uid
  ]);

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

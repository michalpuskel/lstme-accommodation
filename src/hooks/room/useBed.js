import { useCallback } from "react";

import useUser from "../../hooks/user/useUser";
import useIsMyRow from "../../hooks/user/useIsMyRow";
import useIsSwapReady from "../../hooks/room/useIsSwapReady";
import useLiveInSameRoom from "../../hooks/room/useLiveInSameRoom";
import useSwapRequest from "../../hooks/room/useSwapRequest";

const useBed = (userId, onReservationCancel) => {
  const user = useUser(userId);
  const { isMyRow, authedUser } = useIsMyRow(userId);
  const isMyBed = isMyRow;
  const isSwapReady = useIsSwapReady();
  const liveInSameRoom = useLiveInSameRoom();
  const swapRequest = useSwapRequest(authedUser.uid, user.uid);

  const reservationCancelHandler = useCallback(
    async event => {
      event && event.stopPropagation();

      try {
        await onReservationCancel(userId);
      } catch (error) {
        console.error(error);
      }
    },
    [onReservationCancel, userId]
  );

  const onClickHandler = useCallback(async () => {
    try {
      if (isMyBed()) {
        await reservationCancelHandler();
      } else if (
        isSwapReady(user, authedUser) &&
        !liveInSameRoom(user, authedUser)
      ) {
        await swapRequest();
      }
    } catch (error) {
      console.error(error);
    }
  }, [
    isMyBed,
    isSwapReady,
    liveInSameRoom,
    user,
    authedUser,
    reservationCancelHandler,
    swapRequest
  ]);

  return {
    authedUser,
    user,
    isMyBed,
    isSwapReady,
    reservationCancelHandler,
    onClickHandler
  };
};

export default useBed;

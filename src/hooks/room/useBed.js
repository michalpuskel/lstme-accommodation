import { useCallback } from "react";

import useUser from "../../hooks/user/useUser";
import useIsMyRow from "../../hooks/user/useIsMyRow";
import useIsSwapReady from "../../hooks/room/useIsSwapReady";
import useLiveInSameRoom from "../../hooks/room/useLiveInSameRoom";
import useSwapRequest from "../../hooks/room/useSwapRequest";
import useSwapCancel from "../../hooks/room/useSwapCancel";
import useSwapDeny from "../../hooks/room/useSwapDeny";
import useUserInfo from "../user/useUserInfo";
import useRoomInfo from "./useRoomInfo";

const useBed = (userId, onReservationCancel) => {
  const user = useUser(userId);
  const { isMyRow, authedUser } = useIsMyRow(userId);
  const isMyBed = isMyRow;
  const isSwapReady = useIsSwapReady();
  const liveInSameRoom = useLiveInSameRoom();
  const swapRequest = useSwapRequest(authedUser.uid, user.uid);

  const swapCancel = useSwapCancel(userId, user.swap_sent_to_id);

  const userInfo = useUserInfo(user);
  const roomInfo = useRoomInfo(user);
  const swapDeny = useSwapDeny(user.swap_received_from_id, userInfo, roomInfo);

  const reservationCancelHandler = useCallback(
    async event => {
      event && event.stopPropagation();

      try {
        if (user.swap_sent_to_id) {
          await swapCancel();
        } else if (user.swap_received_from_id) {
          await swapDeny();
        }

        await onReservationCancel(userId);
      } catch (error) {
        console.error(error);
      }
    },
    [
      onReservationCancel,
      swapCancel,
      swapDeny,
      user.swap_received_from_id,
      user.swap_sent_to_id,
      userId
    ]
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
    authedUser,
    isMyBed,
    isSwapReady,
    liveInSameRoom,
    reservationCancelHandler,
    swapRequest,
    user
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

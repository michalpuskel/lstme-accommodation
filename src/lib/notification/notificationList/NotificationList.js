import React from "react";

import useSwaps from "../../../hooks/room/useSwaps";
import useNotifications from "../../../hooks/room/useNotifications";
import SwapSent from "../swapSent/SwapSent";
import SwapReceived from "../swapReceived/SwapReceived";
import SwapDenied from "../swapDenied/SwapDenied";

const NotificationList = () => {
  const {
    authedUser,
    swapSentToUser,
    swapReceivedFromUser,

    roomMy,
    roomSwapSentTo,
    roomSwapReceivedFrom,

    swapCancel,
    swapDeny,
    swapAccept
  } = useSwaps();

  const notificationList = useNotifications(authedUser.uid);

  return (
    <>
      {/* {console.log("SENT usr", swapSentToUser)} TODO feedback */}
      {swapSentToUser && (
        <SwapSent
          {...swapSentToUser}
          roomMy={roomMy}
          roomSwapSentTo={roomSwapSentTo}
          onSwapCancel={swapCancel}
        />
      )}
      {/* {console.log("RECEIVED usr", swapReceivedFromUser)} TODO feedback */}
      {swapReceivedFromUser && (
        <SwapReceived
          {...swapReceivedFromUser}
          roomMy={roomMy}
          roomSwapReceivedFrom={roomSwapReceivedFrom}
          onSwapDeny={swapDeny}
          onSwapAccept={swapAccept}
        />
      )}
      {Object.keys(notificationList).map(notificationId => (
        <SwapDenied
          key={notificationId}
          {...notificationList[notificationId]}
          authedUserId={authedUser.uid}
        />
      ))}
    </>
  );
};

export default NotificationList;

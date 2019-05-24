import React from "react";

import useSwaps from "../../../hooks/room/useSwaps";
import SwapSent from "../swapSent/SwapSent";
import SwapReceived from "../swapReceived/SwapReceived";

const NotificationList = () => {
  const {
    swapSentToUser,
    swapReceivedFromUser,
    roomMy,
    roomSwapSentTo,
    roomSwapReceivedFrom,
    swapCancel,
    swapDeny,
    swapAccept
  } = useSwaps();

  return (
    <>
      {swapSentToUser && (
        <SwapSent
          {...swapSentToUser}
          roomMy={roomMy}
          roomSwapSentTo={roomSwapSentTo}
          onSwapCancel={swapCancel}
        />
      )}
      {swapReceivedFromUser && (
        <SwapReceived
          {...swapReceivedFromUser}
          roomMy={roomMy}
          roomSwapReceivedFrom={roomSwapReceivedFrom}
          onSwapDeny={swapDeny}
          onSwapAccept={swapAccept}
        />
      )}
    </>
  );
};

export default NotificationList;

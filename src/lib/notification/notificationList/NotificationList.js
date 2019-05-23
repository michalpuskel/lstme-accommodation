import React from "react";

import useSwaps from "../../../hooks/room/useSwaps";
import SwapSent from "../swapSent/SwapSent";
import SwapReceived from "../swapReceived/SwapReceived";

const NotificationList = () => {
  const {
    swapSentToUser,
    swapReceivedFromUser,
    roomNameMy,
    roomNameSwapSentTo,
    roomNameSwapReceivedFrom,
    swapCancel,
    swapDeny
  } = useSwaps();

  return (
    <>
      {swapSentToUser && (
        <SwapSent
          {...swapSentToUser}
          roomNameMy={roomNameMy()}
          roomNameSwapSentTo={roomNameSwapSentTo()}
          onSwapCancel={swapCancel}
        />
      )}
      {swapReceivedFromUser && (
        <SwapReceived
          {...swapReceivedFromUser}
          roomNameMy={roomNameMy()}
          roomNameSwapReceivedFrom={roomNameSwapReceivedFrom()}
          onSwapDeny={swapDeny}
        />
      )}
    </>
  );
};

export default NotificationList;

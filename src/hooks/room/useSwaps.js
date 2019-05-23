import { useContext } from "react";

import UserContext from "../../config/UserContext";
import useUser from "../../hooks/user/useUser";
import useRoomName from "../../hooks/room/useRoomName";
import useSwapCancel from "../../hooks/room/useSwapCancel";
import useUserId from "../../hooks/user/useUserId";

const useSwaps = () => {
  const authedUser = useContext(UserContext);
  const swapSentToUser = useUser(authedUser.swap_sent_to_id);
  const swapReceivedFromUser = useUser(authedUser.swap_received_from_id);

  const authedUserId = useUserId(authedUser);
  const swapSentToUserId = useUserId(swapSentToUser);
  const swapReceivedFromUserId = useUserId(swapReceivedFromUser);

  const roomNameMy = useRoomName(authedUser);
  const roomNameSwapSentTo = useRoomName(swapSentToUser);
  const roomNameSwapReceivedFrom = useRoomName(swapReceivedFromUser);

  const swapCancel = useSwapCancel(authedUserId(), swapSentToUserId());
  const swapDeny = useSwapCancel(swapReceivedFromUserId(), authedUserId());

  return {
    swapSentToUser,
    swapReceivedFromUser,
    roomNameMy,
    roomNameSwapSentTo,
    roomNameSwapReceivedFrom,
    swapCancel,
    swapDeny
  };
};

export default useSwaps;

import { useContext } from "react";

import UserContext from "../../config/UserContext";
import useUser from "../user/useUser";
import useRoomInfo from "./useRoomInfo";
import useSwapCancel from "./useSwapCancel";
import useSwapAccept from "./useSwapAccept";
import useUserId from "../user/useUserId";

const useSwaps = () => {
  const authedUser = useContext(UserContext);
  const swapSentToUser = useUser(authedUser.swap_sent_to_id);
  const swapReceivedFromUser = useUser(authedUser.swap_received_from_id);

  const authedUserId = useUserId(authedUser);
  const swapSentToUserId = useUserId(swapSentToUser);
  const swapReceivedFromUserId = useUserId(swapReceivedFromUser);

  const roomMy = useRoomInfo(authedUser);
  const roomSwapSentTo = useRoomInfo(swapSentToUser);
  const roomSwapReceivedFrom = useRoomInfo(swapReceivedFromUser);

  const swapCancel = useSwapCancel(authedUserId(), swapSentToUserId());
  const swapDeny = useSwapCancel(swapReceivedFromUserId(), authedUserId());
  const swapAccept = useSwapAccept(swapReceivedFromUserId(), authedUserId());

  return {
    swapSentToUser,
    swapReceivedFromUser,
    roomMy,
    roomSwapSentTo,
    roomSwapReceivedFrom,
    swapCancel,
    swapDeny,
    swapAccept
  };
};

export default useSwaps;

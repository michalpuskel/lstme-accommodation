import { useContext } from "react";

import UserContext from "../../config/UserContext";
import useUser from "../user/useUser";
import useRoomInfo from "./useRoomInfo";
import useSwapCancel from "./useSwapCancel";
import useSwapAccept from "./useSwapAccept";
import useSwapDeny from "./useSwapDeny";
import useUserInfo from "../user/useUserInfo";

const useSwaps = () => {
  const authedUser = useContext(UserContext);
  const swapSentToUser = useUser(authedUser.swap_sent_to_id);
  const swapReceivedFromUser = useUser(authedUser.swap_received_from_id);

  const authedUserInfo = useUserInfo(authedUser);
  const swapSentToUserInfo = useUserInfo(swapSentToUser);
  const swapReceivedFromUserInfo = useUserInfo(swapReceivedFromUser);

  const roomMy = useRoomInfo(authedUser);
  const roomSwapSentTo = useRoomInfo(swapSentToUser);
  const roomSwapReceivedFrom = useRoomInfo(swapReceivedFromUser);

  const swapCancel = useSwapCancel(
    authedUserInfo.uid(),
    swapSentToUserInfo.uid()
  );
  const swapDeny = useSwapDeny(
    swapReceivedFromUserInfo.uid(),
    authedUserInfo,
    roomMy
  );
  const swapAccept = useSwapAccept(
    swapReceivedFromUserInfo.uid(),
    authedUserInfo.uid()
  );

  return {
    authedUser,
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

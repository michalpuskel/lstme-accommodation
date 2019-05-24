import React from "react";

import useUserName from "../../../hooks/user/useUserName";
import useElapsedTime from "../../../hooks/utils/useElapsedTime";
import useNotificationDismiss from "../../../hooks/room/useNotificationDismiss";

const SwapDenied = props => {
  const userName = useUserName();
  const elapsedTime = useElapsedTime();
  const notificationDismiss = useNotificationDismiss(
    props.uid,
    props.authedUserId
  );

  return (
    <div>
      <h1>{elapsedTime(props.timestamp)}</h1>
      <p>
        Účastník <strong>{userName(props.user)}</strong> z izby{" "}
        <em>{props.room}</em> zamietol Tvoju žiadosť o výmenu postele.
      </p>
      <button onClick={notificationDismiss}>OK</button>
    </div>
  );
};

export default SwapDenied;

import React from "react";

import "./SwapDenied.scss";
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
    <article className="message notification--ring">
      <div className="message-header">
        <p>{elapsedTime(props.timestamp)}</p>
        <button
          className="delete"
          aria-label="delete"
          onClick={notificationDismiss}
        />
      </div>

      <div className="message-body">
        Účastník <strong>{userName(props.user)}</strong> z izby{" "}
        <em>{props.room}</em> zamietol Tvoju žiadosť o výmenu postele.
      </div>
    </article>
  );
};

export default SwapDenied;

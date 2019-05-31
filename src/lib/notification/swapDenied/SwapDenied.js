import React, { useCallback } from "react";

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

  const message = useCallback(
    type => {
      switch (type) {
        case "user-deny":
          return (
            <>
              Účastník <strong>{userName(props.user)}</strong> z izby{" "}
              <em>{props.room}</em> zamietol Tvoju žiadosť o výmenu postele.
            </>
          );
        case "user-abandon":
          return (
            <>
              Účastník <strong>{userName(props.user)}</strong> sa odhlásil z
              izby <em>{props.room}</em>.
            </>
          );
        case "user-delete":
          return <>foo</>;
        case "room-delete":
          return <>foo</>;
        default:
          return "Tvoja žiadosť bola zamietnutá z neznámych dôvodov.";
      }
    },
    [props.room, props.user, userName]
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

      <div className="message-body"> {message(props.type)} </div>
    </article>
  );
};

export default SwapDenied;

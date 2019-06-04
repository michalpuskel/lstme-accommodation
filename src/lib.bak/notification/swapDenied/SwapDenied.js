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
              Účastník <strong> {userName(props.user)} </strong> z izby{" "}
              <em> {props.room} </em> <strong>zamietol</strong> Tvoju žiadosť o
              výmenu postele.
            </>
          );
        case "user-abandon":
          return (
            <>
              Účastník <strong> {userName(props.user)} </strong> sa{" "}
              <strong>odhlásil</strong> z izby <em> {props.room} </em>.
            </>
          );
        case "user-delete":
          return (
            <>
              Účastník <strong> {userName(props.user)} </strong> z izby{" "}
              <em> {props.room} </em> bol <strong>vymazaný</strong> zo systému.
            </>
          );
        case "room-delete":
          return (
            <>
              Izba <strong> {props.room} </strong> bola{" "}
              <strong>vymazaná</strong> zo systému.
            </>
          );
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

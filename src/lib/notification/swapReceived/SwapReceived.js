import React from "react";
import { Link } from "react-router-dom";

import useUserName from "../../../hooks/user/useUserName";

const SwapReceived = props => {
  const userName = useUserName();

  return (
    <div>
      <h1>Výmena postele</h1>
      <p>
        Účastník <strong>{userName(props)}</strong> z izby{" "}
        <Link to={`/room/${props.roomSwapReceivedFrom.uid()}`}>
          <em>{props.roomSwapReceivedFrom.name()}</em>
        </Link>{" "}
        Ťa žiada o výmenu nocľahu. Ty bývaš na izbe{" "}
        <Link to={`/room/${props.roomMy.uid()}`}>
          <em>{props.roomMy.name()}</em>
        </Link>
        .
      </p>
      <button onClick={props.onSwapAccept}>Prijať</button>
      <button onClick={props.onSwapDeny}>Odmietnuť</button>
    </div>
  );
};

export default SwapReceived;

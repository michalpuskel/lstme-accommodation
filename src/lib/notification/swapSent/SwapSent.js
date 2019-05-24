import React from "react";
import { Link } from "react-router-dom";

import useUserName from "../../../hooks/user/useUserName";

const SwapSent = props => {
  const userName = useUserName();

  return (
    <div>
      <h1>Výmena postele</h1>
      <p>
        Žiadaš účastníka <strong>{userName(props)}</strong> z izby{" "}
        <Link to={`/room/${props.roomSwapSentTo.uid()}`}>
          <em>{props.roomSwapSentTo.name()}</em>
        </Link>{" "}
        o výmenu nocľahu. Ty bývaš na izbe{" "}
        <Link to={`/room/${props.roomMy.uid()}`}>
          <em>{props.roomMy.name()}</em>
        </Link>
        .
      </p>
      <button onClick={props.onSwapCancel}>Zrušiť žiadosť</button>
    </div>
  );
};

export default SwapSent;

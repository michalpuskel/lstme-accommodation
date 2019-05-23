import React from "react";

import useUserName from "../../../hooks/user/useUserName";

const SwapReceived = props => {
  const userName = useUserName();

  return (
    <div>
      <h1>Výmena postele</h1>
      <p>
        Účastník <strong>{userName(props)}</strong> z izby{" "}
        <em>{props.roomNameSwapReceivedFrom}</em> Ťa žiada o výmenu nocľahu. Ty
        bývaš na izbe <em>{props.roomNameMy}</em>.
      </p>
      <button onClick={props.TODO}>Prijať</button>
      <button onClick={props.onSwapDeny}>Odmietnuť</button>
    </div>
  );
};

export default SwapReceived;

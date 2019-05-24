import React from "react";

import useUserName from "../../../hooks/user/useUserName";
import useElapsedTime from "../../../hooks/utils/useElapsedTime";

const SwapDenied = props => {
  const userName = useUserName();
  const elapsedTime = useElapsedTime();

  return (
    <div>
      <h1>{elapsedTime(props.timestamp)}</h1>
      <p>
        Účastník <strong>{userName(props.user)}</strong> z izby{" "}
        <em>{props.room}</em> zamietol Tvoju žiadosť o výmenu postele.
      </p>
      <button onClick={null}>OK</button>
    </div>
  );
};

export default SwapDenied;

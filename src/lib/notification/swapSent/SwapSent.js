import React from "react";

import useUserName from "../../../hooks/user/useUserName";

const SwapSent = props => {
  const userName = useUserName();

  return (
    <div>
      <h1>Výmena postele</h1>
      <p>
        Žiadaš účastníka <strong>{userName(props)}</strong> z izby{" "}
        <em>{props.roomNameSwapSentTo}</em> o výmenu nocľahu. Ty bývaš na izbe{" "}
        <em>{props.roomNameMy}</em>.
      </p>
      <button onClick={props.onSwapCancel}>Zrušiť žiadosť</button>
    </div>
  );
};

export default SwapSent;

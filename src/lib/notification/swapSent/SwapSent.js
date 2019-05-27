/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

import useUserName from "../../../hooks/user/useUserName";

const SwapSent = props => {
  const userName = useUserName();

  return (
    <div className="card notification--ring notifications__message">
      <header className="card-header">
        <p className="card-header-title">Výmena postele</p>
      </header>

      <div className="card-content">
        <div className="content">
          Žiadaš účastníka <strong>{userName(props)}</strong> z izby{" "}
          <Link to={`/room/${props.roomSwapSentTo.uid()}`}>
            <em>{props.roomSwapSentTo.name()}</em>
          </Link>{" "}
          o výmenu nocľahu. Ty bývaš na izbe{" "}
          <Link to={`/room/${props.roomMy.uid()}`}>
            <em>{props.roomMy.name()}</em>
          </Link>
          .
        </div>
      </div>

      <footer className="card-footer">
        <a href="#" className="card-footer-item" onClick={props.onSwapCancel}>
          Zrušiť žiadosť
        </a>
      </footer>
    </div>
  );
};

export default SwapSent;

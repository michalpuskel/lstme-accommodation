/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";

import "./SwapReceived.scss";
import useUserName from "../../../hooks/user/useUserName";

const SwapReceived = props => {
  const userName = useUserName();

  return (
    <div className="card notification--ring notifications__message">
      <header className="card-header">
        <p className="card-header-title">Výmena postele</p>
      </header>

      <div className="card-content">
        <div className="content">
          Účastník <strong>{userName(props)}</strong> z izby{" "}
          <Link to={`/room/${props.roomSwapReceivedFrom.uid()}`}>
            <em>{props.roomSwapReceivedFrom.name()}</em>
          </Link>{" "}
          Ťa žiada o výmenu nocľahu. Ty bývaš na izbe{" "}
          <Link to={`/room/${props.roomMy.uid()}`}>
            <em>{props.roomMy.name()}</em>
          </Link>
          .
        </div>
      </div>

      <footer className="card-footer">
        <a href="#" className="card-footer-item" onClick={props.onSwapAccept}>
          Prijať
        </a>
        <a href="#" className="card-footer-item" onClick={props.onSwapDeny}>
          Odmietnuť
        </a>
      </footer>
    </div>
  );
};

export default SwapReceived;

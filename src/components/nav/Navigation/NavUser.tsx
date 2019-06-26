import React, { memo, ReactElement } from "react";
import { NavLink } from "react-router-dom";

import { IUser } from "../../../@types";
import { useUserContext } from "../../../hooks/_context/UserContext";
import useLogOut from "../../../hooks/user/useLogOut";
import { userName } from "../../../helpers/user";

const NavUser = memo(
  (): ReactElement => {
    const user = useUserContext() as IUser;
    const logOut = useLogOut();

    return (
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <NavLink className="button is-primary" to={`/user/${user.uid}`}>
              <strong> {userName(user)} </strong>
            </NavLink>

            <button className="button is-light" onClick={logOut}>
              Odhlásiť
            </button>
          </div>
        </div>
      </div>
    );
  }
);

export default NavUser;

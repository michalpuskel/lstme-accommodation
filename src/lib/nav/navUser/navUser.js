import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../../config/UserContext";
import useUserName from "../../../hooks/user/useUserName";
import useLogOut from "../../../hooks/user/useLogOut";

const NavUser = () => {
  const user = useContext(UserContext);
  const userName = useUserName();
  const logOut = useLogOut();

  return (
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <NavLink className="button is-primary" to={`/user/${user.uid}`}>
            <strong>{userName(user)}</strong>
          </NavLink>

          <button className="button is-light" onClick={logOut}>
            Odhlásiť
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavUser;

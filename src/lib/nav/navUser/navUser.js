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
    <ul>
      <li>
        <NavLink to={`/user/${user.uid}`}>{userName(user)}</NavLink>
      </li>

      <li>
        <button onClick={logOut}>Odhlásiť</button>
      </li>
    </ul>
  );
};

export default NavUser;

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../../config/UserContext";
import { auth } from "../../../config/firebase";

const NavUser = () => {
  const user = useContext(UserContext);

  const getUserName = () => {
    return `${user.first_name} ${user.last_name}`;
  };

  const logUserOut = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.info("error", err);
    }
  };

  return (
    <ul>
      <li>
        <NavLink to={`/user/${user.uid}`}>{getUserName()}</NavLink>
      </li>

      <li>
        <button onClick={logUserOut}>Odhlásiť</button>
      </li>
    </ul>
  );
};

export default NavUser;

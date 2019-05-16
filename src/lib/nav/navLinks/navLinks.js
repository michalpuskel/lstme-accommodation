import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../../config/UserContext";

const NavLinks = () => {
  const user = useContext(UserContext);

  return (
    <ul>
      <li>
        <NavLink to="/">Izby</NavLink>
      </li>
      {user.is_super_admin && (
        <li>
          <NavLink to="/users">Účastníci</NavLink>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;

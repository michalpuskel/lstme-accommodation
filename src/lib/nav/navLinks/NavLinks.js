import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import UserContext from "../../../config/UserContext";

const NavLinks = () => {
  const user = useContext(UserContext);

  return (
    <div className="navbar-start">
      <NavLink className="navbar-item" to="/">
        Izby
      </NavLink>

      {user.is_super_admin && (
        <NavLink className="navbar-item" to="/users">
          Účastníci
        </NavLink>
      )}
    </div>
  );
};

export default NavLinks;

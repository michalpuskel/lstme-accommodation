import React, { memo, ReactElement } from "react";
import { NavLink } from "react-router-dom";

import { useUserContext } from "../../../hooks/_context/UserContext";

const NavLinks = memo(
  (): ReactElement => {
    const user = useUserContext();
    const isSuperAdmin = user && user.is_super_admin;

    return (
      <div className="navbar-start">
        <NavLink className="navbar-item" to="/">
          Izby
        </NavLink>

        {isSuperAdmin && (
          <NavLink className="navbar-item" to="/users">
            Účastníci
          </NavLink>
        )}
      </div>
    );
  }
);

export default NavLinks;

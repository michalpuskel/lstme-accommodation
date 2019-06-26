import React, { memo, ReactElement } from "react";

import useToggleable from "../../../hooks/useToggleable";

import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavUser from "./NavUser";

const Navigation = memo(
  (): ReactElement => {
    const showMenu = useToggleable();

    return (
      <>
        <div className="navbar-brand">
          <NavBrand showMenu={showMenu.value} toggleMenu={showMenu.toggle} />
        </div>

        <div
          id="navMenu"
          className={`navbar-menu ${showMenu ? "is-active" : ""}`}
        >
          <NavLinks />
          <NavUser />
        </div>
      </>
    );
  }
);

export default Navigation;

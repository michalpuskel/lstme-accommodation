import React, { memo, ReactElement } from "react";

import useToggleable from "../../../hooks/useToggleable";

import NavBrand from "./NavBrand";
import NavLinks from "./NavLinks";
import NavUser from "./NavUser";

const Navigation = memo(
  (): ReactElement => {
    const { value, toggle } = useToggleable();

    return (
      <>
        <div className="navbar-brand">
          <NavBrand isActive={value} onClick={toggle} />
        </div>

        <div id="navMenu" className={`navbar-menu ${value ? "is-active" : ""}`}>
          <NavLinks />
          <NavUser />
        </div>
      </>
    );
  }
);

export default Navigation;

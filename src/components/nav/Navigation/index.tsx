import React, { memo } from "react";

import useToggleable from "../../../hooks/useToggleable";

import NavLinks from "./NavLinks";
import NavUser from "./NavUser";
import NavBrand from "./NavBrand";

const Navigation = memo(() => {
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
});

export default Navigation;

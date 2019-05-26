import React from "react";

import useNav from "../../../hooks/utils/useNav";
import NavLinks from "../navLinks/NavLinks";
import NavUser from "../navUser/NavUser";
import NavBrand from "../navBrand/NavBrand";

const Navigation = () => {
  const { showMenu, toggleMenu } = useNav();

  return (
    <>
      <div className="navbar-brand">
        <NavBrand showMenu={showMenu} toggleMenu={toggleMenu} />
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
};

export default Navigation;

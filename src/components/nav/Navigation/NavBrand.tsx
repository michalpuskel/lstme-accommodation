import React, { memo } from "react";
import { Link } from "react-router-dom";

import NavBurger from "./NavBurger";

interface NavBrandProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const NavBrand = memo((props: NavBrandProps) => (
  <>
    <Link className="navbar-item" to="/">
      <h1 className="title">LSTME</h1>
    </Link>

    <NavBurger showMenu={props.showMenu} toggleMenu={props.toggleMenu} />
  </>
));

export default NavBrand;

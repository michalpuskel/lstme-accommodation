import React from "react";
import { Link } from "react-router-dom";

import NavBurger from "../navBurger/NavBurger";

const NavBrand = props => {
  return (
    <>
      <Link className="navbar-item" to="/">
        <h1 className="title">LSTME</h1>
      </Link>

      <NavBurger showMenu={props.showMenu} toggleMenu={props.toggleMenu} />
    </>
  );
};

export default NavBrand;

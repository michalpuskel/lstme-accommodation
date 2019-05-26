import React from "react";

import NavBurger from "../navBurger/NavBurger";

const NavBrand = props => {
  return (
    <>
      <a
        className="navbar-item"
        href="http://lstme.sk"
        target="_blank"
        rel="noopener noreferrer"
      >
        <h1 className="title">LSTME</h1>
      </a>

      <NavBurger showMenu={props.showMenu} toggleMenu={props.toggleMenu} />
    </>
  );
};

export default NavBrand;
